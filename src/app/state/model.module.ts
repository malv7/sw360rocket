import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { modelReducer } from './model.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('model', modelReducer)
  ]
})
export class ModelModule { }