import { UrlSegments } from './../../router/router.api';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { MessageType } from './../../structure/state/structure.reducer';
import { EmbeddedSW360Component, EmbeddedProject, SW360Resources } from "../../state/models";
import { State } from "../../state";
import { Store } from "@ngrx/store";
import * as ModelActions from './../../state/model.actions';
import * as StructureActions from './../../structure/state/structure.actions';
import * as ComponentActions from './../../component/state/component.actions';
import * as fromComponent from './../../component/state/component.reducer';
import * as ReleaseActions from './../../release/state/release.actions';
import * as ProjectActions from './../../project/state/project.actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';

export enum RequestTypes {
  componentList = 'componentList',
  component = 'component',
  projectList = 'projectList',
  project = 'project',
  releaseList = 'releaseList',
  release = 'release',
  licenseList = 'licenseList',
  license = 'license',
  vendorList = 'vendorList',
  vendor = 'vendor',
  attachmentList = 'attachmentList',
  attachment = 'attachment',
  userList = 'userList',
  user = 'user'
}

@Injectable()
export class HttpService {

  headers: HttpHeaders;
  resourceApiUri: string;

  // TODO: check
  lastRequestUri: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<State>
  ) {
    const bearerToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsic3czNjAtUkVTVC1BUEkiXSwidXNlcl9uYW1lIjoiYWRtaW5Ac3czNjAub3JnIiwic2NvcGUiOlsic3czNjAucmVhZCIsInN3MzYwLndyaXRlIl0sImV4cCI6MTUxNjU2MzY3NCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9TVzM2MF9VU0VSIl0sImp0aSI6IjFmYWYyMzY4LTc4ODgtNDhlMi04NDdhLTQ0MzEyNTdiN2JlYiIsImNsaWVudF9pZCI6InRydXN0ZWQtc3czNjAtY2xpZW50In0.b4cAlg7f2CEF3emJ-CBAONe0I-AlLi7n7UWlB_AVsG9c-fNWOzV-XWHxgnE2rZk2-yWl1DThcZKg6P9n--wLxjcesY4wQd7Jn587CS4YxjGYr7oBVAOMb0pVkSBmPIx7f85G9QCBc326MXeoe_NH0MczEyPM-IS-2qw5daKDqaJfepMx81xcai9DNxTA0sw_d4-bLf970cidIg900S2EvKb0B-a0tOozSFvDNGrckYRiQjSgdtkZA-qeZ54GjOi_cTOgwKWRnGSSY5kGP7ju_ybPA3IQCCp0Y8FX2LkWF-W08FZrnppTE6UUOwqYRGhDYmus7Vzuzva3y93XrCgXOQ`;
    const token = 'Bearer ' + bearerToken;
    this.headers = new HttpHeaders().set('Authorization', token);
    this.resourceApiUri = 'http://localhost:8080/resource/api/';
  }

  isIdenticalRequest(requestUri: string): boolean {
    if (this.lastRequestUri) {
      if (this.lastRequestUri === requestUri) {
        return true;
      } else {
        this.lastRequestUri = requestUri;
        return false;
      }
    }
  }

  handleRequest(feature: string, id?: string) {

    let requestUri = this.resourceApiUri + feature;
    if (id) requestUri = `${requestUri}/${id}`;
    if (this.isIdenticalRequest(requestUri)) return;

    switch (feature) {

      case UrlSegments.components: {
        id ? this.store.dispatch(new ComponentActions.Get(requestUri))
          : this.store.dispatch(new ComponentActions.Query());
        return;
      }

      case UrlSegments.releases: {
        if (id) this.store.dispatch(new ReleaseActions.Get(requestUri));
        return;
      }

      case UrlSegments.projects: {
        id ? this.store.dispatch(new ProjectActions.Get(requestUri))
          : this.store.dispatch(new ProjectActions.Query());
        return;
      }

      // vulnerabilities

      default:
        break;
    }
  }

  get(uri: string, type: RequestTypes) {
    // TODO: switchmap every request
    this.processGet(uri, type);
  }

  private processGet(uri: string, type: RequestTypes) {
    this.http.get<any>(uri, { headers: this.headers })
      .subscribe(
      (response: Response) => this.dispatchSuccess(response, type),
      error => this.handleError(error)
      );
  }

  dispatchSuccess(response: Response, type: RequestTypes) {

    switch (type) {

      case RequestTypes.componentList: {
        this.store.dispatch(new ComponentActions.QuerySuccess(response));
        this.setMessage('get components successful!', MessageType.success);
        return;
      }

      case RequestTypes.component: {
        this.store.dispatch(new ComponentActions.GetSuccess(response));
        this.setMessage('get 1 component successful!', MessageType.success);
        return;
      }

      case RequestTypes.release: {
        this.store.dispatch(new ReleaseActions.GetSuccess(response));
        this.setMessage('get 1 release successful!', MessageType.success);
        return;
      }

      case RequestTypes.projectList: {
        this.store.dispatch(new ProjectActions.QuerySuccess(response));
        this.setMessage('get projects successful!', MessageType.success);
        return;
      }

      case RequestTypes.project: {
        this.store.dispatch(new ProjectActions.GetSuccess(response));
        this.setMessage('get 1 project successful!', MessageType.success);
        return;
      }

      case RequestTypes.attachment: break;
      case RequestTypes.attachmentList: break;
      case RequestTypes.license: break;
      case RequestTypes.licenseList: break;
      // case RequestTypes.releaseList: break; // TODO: this will never happen since it is always embedded
      case RequestTypes.user: break;
      case RequestTypes.userList: break;
      case RequestTypes.vendor: break;
      case RequestTypes.vendorList: break;
      default: break;
    }
  }

  handleError(error: Response | HttpErrorResponse | any) {

    console.log("handleError", error);

    if (error instanceof HttpErrorResponse) {
      if (error.status)
        this.handleErrorStatus(error.status);
      else
        console.log("error instanceof HttpErrorResponse BUT has no status");
    } else if (error instanceof Response) {
      console.log("error instanceof Response");
    } else {
      console.log("any error");
    }
  }

  handleErrorStatus(status: number) {
    switch (status) {

      case 401: {
        this.setMessage("401 occured, you are not authorized to request that resource", MessageType.error);
        return;
      }

      default:
        break;
    }
  }

  setMessage(text: string, type: MessageType) {
    this.store.dispatch(new StructureActions.SetMessage({
      active: true,
      type: type,
      text: text,
      durationInMs: 8000
    }));
  }

}
