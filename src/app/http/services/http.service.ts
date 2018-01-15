import { MessageType } from './../../structure/state/structure.reducer';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import { EmbeddedSW360Component, EmbeddedProject, SW360Resources } from "../../state/models";
import { State } from "../../state";
import { Store } from "@ngrx/store";
import * as ModelActions from './../../state/model.actions';

import 'rxjs/add/operator/switchMap';

import * as StructureActions from './../../structure/state/structure.actions';

import * as ComponentActions from './../../component/state/component.actions';
import * as fromComponent from './../../component/state/component.reducer';


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

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<State>
  ) {
    const bearerToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsic3czNjAtUkVTVC1BUEkiXSwidXNlcl9uYW1lIjoiYWRtaW5Ac3czNjAub3JnIiwic2NvcGUiOlsic3czNjAucmVhZCIsInN3MzYwLndyaXRlIl0sImV4cCI6MTUxNTk4MjA0MywiYXV0aG9yaXRpZXMiOlsiUk9MRV9TVzM2MF9VU0VSIl0sImp0aSI6IjQxOTQxMzU1LTliOTEtNGNhNC05MzQ4LWE2M2RmZGY2N2Q5NiIsImNsaWVudF9pZCI6InRydXN0ZWQtc3czNjAtY2xpZW50In0.PflHw_7dplRvcgwpcSCaW-2-EGH3Y_0E_ZTu4i98m48xp01k59hp_mNdZX-4o100DJySk7PDcV4vmUx5J_bs8cRgfgCHdhtN-PmnH4BgOEkHSaMxJGFA_5hp6wq_DdV7t_BVO2F7aJH4HF1xmjlzXSfmJrI7jsymwCzb3Ot5NFe6V5DwDeEPKYhsSN6ZkbbvTu8dWe783KAG0NCQ9BIXchKLhO8ise3kAAZDy98oTue0R6OlErzRdYkos5yB0BXwsaeQOUc2ORD7HcBBi6ReQPnJbjDPjqMGuKBRJKabqLY1c7iQifC0j8j1HgJsWouhK1Yz6AXLOR90BREJ2852CA`;
    const token = 'Bearer ' + bearerToken;
    this.headers = new HttpHeaders().set('Authorization', token);

    // this.store.select(fromComponent.selectComponents).subscribe(x => console.log(x));
    this.store.select(fromComponent.selectComponent).subscribe(x => console.log(x));

    Observable.timer(1000).subscribe(() => {
      this.store.dispatch(new ComponentActions.Get("http://localhost:8080/resource/api/components/c0b78d8e672a28ff0a0abb3e00002d14"))
    });
  }

  get(uri: string, type: RequestTypes) {
    this.processGet(uri, type);
  }

  private processGet(uri: string, type: RequestTypes) {
    this.http.get<any>(uri, { headers: this.headers })
      .subscribe((response: Response) => this.dispatchSuccess(response, type), error => this.handleError(error));
  }

  dispatchSuccess(response: Response, type: RequestTypes) {
    // console.log(response);
    // console.log(type);

    // do global stuff (clear lists, clear detail, set titles, set breadcrumb) here before dispatching each action for feature listeners

    switch (type) {
      case RequestTypes.componentList: {
        this.store.dispatch(new ComponentActions.QuerySuccess(response));
        this.setMessage('get components successful!', MessageType.success);
        break;
      }
      
      case RequestTypes.component: {
        this.store.dispatch(new ComponentActions.GetSuccess(response));
        this.setMessage('get 1 component successful!', MessageType.success);  
        break;
      }

      case RequestTypes.attachment: break;
      case RequestTypes.attachmentList: break;
      case RequestTypes.license: break;
      case RequestTypes.licenseList: break;
      case RequestTypes.project: break;
      case RequestTypes.projectList: break;
      case RequestTypes.release: break;
      case RequestTypes.releaseList: break;
      case RequestTypes.user: break;
      case RequestTypes.userList: break;
      case RequestTypes.vendor: break;
      case RequestTypes.vendorList: break;
      default: break;
    }
  }

  handleError(error: Response | HttpErrorResponse | any) {
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