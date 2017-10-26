import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { SemanticRootComponent } from './components/root/semantic-root.component';
import { SuiModule } from 'ng2-semantic-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemanticDateComponent } from './components/date/semantic-date.component';
import { SemanticInputComponent } from './components/input/semantic-input.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // https://github.com/edcarroll/ng2-semantic-ui
    SuiModule,
    ChartsModule
  ],
  declarations: [
    SemanticRootComponent,
    SemanticInputComponent,
    SemanticDateComponent,
    LineChartComponent
  ],
  exports: [
    SemanticRootComponent,
    SemanticInputComponent,
    SemanticDateComponent
  ]
})
export class SemanticPlaygroundModule {

}