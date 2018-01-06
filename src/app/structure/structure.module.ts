import { NgModule } from '@angular/core';

// router
import { RouterModule } from '@angular/router';

// components
import { StructureRootComponent } from './components/structure-root/structure-root.component';
import { BrandComponent } from './components/brand/brand.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';

// content
import { ContentComponent } from './components/content/content.component';
import { BreadcrumbComponent } from './components/info-bar/breadcrumb/breadcrumb.component';
import { ContentTitleComponent } from './components/info-bar/title/content-title.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    StructureRootComponent,
    BrandComponent,
    LeftBarComponent,
    TopBarComponent,
    FooterComponent,
    ContentComponent,
    BreadcrumbComponent,
    ContentTitleComponent,
    InfoBarComponent
  ],
  exports: [ StructureRootComponent ]
})
export class StructureModule { }
