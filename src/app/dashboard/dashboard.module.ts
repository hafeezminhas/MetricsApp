import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
