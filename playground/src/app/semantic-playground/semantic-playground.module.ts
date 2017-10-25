import { SuiModule } from 'ng2-semantic-ui';
import { SemanticRootComponent } from './components/semantic-root.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemanticDateComponent } from './components/date/semantic-date.component';
import { SemanticInputComponent } from './components/input/semantic-input.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuiModule,
  ],
  declarations: [
    SemanticRootComponent,
    SemanticInputComponent,
    SemanticDateComponent
  ],
  exports: [
    SemanticRootComponent,
    SemanticInputComponent,
    SemanticDateComponent
  ]
})
export class SemanticPlaygroundModule {

}