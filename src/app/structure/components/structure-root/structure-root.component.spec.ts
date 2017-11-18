import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StructureRootComponent } from './structure-root.component';


describe('LayoutRootComponent', () => {
  let component: StructureRootComponent;
  let fixture: ComponentFixture<StructureRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: 
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
