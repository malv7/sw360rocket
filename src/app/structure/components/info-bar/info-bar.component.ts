import { Component } from "@angular/core";

@Component({
  selector: 'sw-info-bar',
  template: `

    <!-- x space-between y centered -->
    <div fxLayout="row" fxLayoutAlign="space-between center" class="info-bar">
      
      <!-- Breadcrumb and title -->
      <div class="breadcrumb-title">
        <sw-breadcrumb></sw-breadcrumb>
        <sw-title></sw-title>
      </div>
      
      <!-- Message and global action buttons area -->  
      <sw-message></sw-message>

    </div>
  `,
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent { }