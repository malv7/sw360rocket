import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { modelReducer } from './model.reducer';
import { ModelService } from "./models";

@NgModule({
  imports: [
    StoreModule.forFeature('model', modelReducer)
  ],
  providers: [
    ModelService
  ]
})
export class ModelModule { }