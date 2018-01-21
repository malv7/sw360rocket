import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EccDetailsCreateComponent } from './ecc-details-create.component';

describe('EccDetailsCreateComponent', () => {
  let component: EccDetailsCreateComponent;
  let fixture: ComponentFixture<EccDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EccDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EccDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
