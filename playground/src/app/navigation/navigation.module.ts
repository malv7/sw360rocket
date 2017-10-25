import { AppRoutingModule } from './../app-routing.module';
import { TopNavigationComponent } from './components/top/top-navigation.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    TopNavigationComponent
  ],
  exports: [
    TopNavigationComponent
  ]
})
export class NavigationModule {

}