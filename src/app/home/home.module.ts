import { VendorsComponent } from './vendors/vendors.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { IntroComponent } from './intro/intro.component';

import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { HomeFooterComponent } from './home-layout/home-footer/home-footer.component';
import { HomeHeaderComponent } from './home-layout/home-header/home-header.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    IntroComponent,
    VendorsComponent,
    ServicesComponent,
    ContactComponent
  ]
})
export class HomeModule { }
