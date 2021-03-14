import { NgPopupsModule } from 'ng-popups';
import { RouterModule } from '@angular/router';
import { WINDOW_PROVIDERS } from './helpers/window.helper';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLoaderComponent } from './components/app-loader/app-loader.component';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { FontSizeDirective } from './directives/font-size.directive';

@NgModule({
  declarations: [
    AppLoaderComponent,
    FontSizeDirective,
    ScrollToDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgPopupsModule,
  ],
  exports: [
    AppLoaderComponent,
    FontSizeDirective,
    ScrollToDirective,
    NgPopupsModule,
  ],
  providers: [WINDOW_PROVIDERS]
})
export class SharedModule { }
