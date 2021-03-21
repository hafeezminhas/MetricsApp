import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './auth/interceptors/auth-interceptor';

import * as fromApp from './store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgPopupsGlobalConfig, NgPopupsModule } from 'ng-popups';
import { NotFoundComponent } from './not-found/not-found.component';
import {ReactiveFormsModule} from '@angular/forms';

const ngxPopupsConfig: NgPopupsGlobalConfig = {
  theme: 'material',
  okButtonText: 'Yes',
  cancelButtonText: 'No',
  color: '#266706',
  titles: {
    alert: 'Danger!',
    confirm: 'Confirmation',
    prompt: 'Website asks...'
  }
};
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
   ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.reducers),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgPopupsModule.forRoot(ngxPopupsConfig),
    NgxMaskModule.forRoot(maskConfig),
    LoadingBarHttpClientModule,
    LoadingBarModule,
    LoadingBarRouterModule,

    MaterialModule,
    SharedModule,
    AuthModule,
    LayoutModule,
    HomeModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
