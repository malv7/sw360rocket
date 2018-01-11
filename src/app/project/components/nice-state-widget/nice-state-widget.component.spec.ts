import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiceStateWidgetComponent } from './nice-state-widget.component';

describe('NiceStateWidgetComponent', () => {
  let component: NiceStateWidgetComponent;
  let fixture: ComponentFixture<NiceStateWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiceStateWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiceStateWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
