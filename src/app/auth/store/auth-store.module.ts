import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './auth.effects';
import { authReducers } from './auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthEffects]
})
export class AuthStoreModule {}
