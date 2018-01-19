import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EccComponent } from './ecc.component';

describe('EccComponent', () => {
  let component: EccComponent;
  let fixture: ComponentFixture<EccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
