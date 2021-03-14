import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './../material/material.module';

import { authFeatureKey } from './store/state';
import { authReducers } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(authFeatureKey, authReducers),
    MaterialModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyAccountComponent
  ]
})
export class AuthModule { }
