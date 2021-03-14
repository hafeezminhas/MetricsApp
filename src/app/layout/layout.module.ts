import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [ToolbarComponent, SidenavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent
  ]
})
export class LayoutModule { }
