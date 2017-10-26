import { BrandComponent } from './components/brand/brand.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { LayoutRootComponent } from './components/root/layout-root.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LayoutRootComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    BrandComponent
  ],
  exports: [
    LayoutRootComponent
  ]
})
export class LayoutModule { }