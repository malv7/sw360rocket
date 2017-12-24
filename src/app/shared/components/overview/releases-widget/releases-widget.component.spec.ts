import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesWidgetComponent } from './releases-widget.component';

describe('ReleasesWidgetComponent', () => {
  let component: ReleasesWidgetComponent;
  let fixture: ComponentFixture<ReleasesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
