import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

interface MichiDummyComponent {
  name: string;
  description: string;
}

const DUMMY_COMPONENT: MichiDummyComponent = {
  name: 'xyz',
  description: 'abc'
}

@Component({
  selector: 'sw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getDummyData();
  }

  getDummyData(): Observable<MichiDummyComponent> {
    return Observable.of(DUMMY_COMPONENT);
  }

}
