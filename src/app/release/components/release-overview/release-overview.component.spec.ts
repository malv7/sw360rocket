import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseOverviewComponent } from './release-overview.component';

describe('ComponentOverviewComponent', () => {
  let component: ReleaseOverviewComponent;
  let fixture: ComponentFixture<ReleaseOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
