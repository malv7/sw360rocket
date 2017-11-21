import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleComponentComponent } from './single-component.component';

describe('SingleComponentComponent', () => {
  let component: SingleComponentComponent;
  let fixture: ComponentFixture<SingleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
