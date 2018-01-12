import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { State } from './../../../../state';
import * as fromStructure from './../../../state/structure.reducer';

@Component({
  selector: 'sw-title',
  template: `
    <div class="activeRoute">
      {{ title }}
    </div>
  `,
  styleUrls: ['./content-title.component.scss']
})
export class ContentTitleComponent implements AfterViewChecked {

  title: string;
  constructor(private store: Store<State>, private cd: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    // https://stackoverflow.com/questions/39787038/how-to-manage-angular2-expression-has-changed-after-it-was-checked-exception-w
    this.store.select(fromStructure.selectTitle).take(1).subscribe(title => this.title = title);
    this.cd.detectChanges();
  }

}