import { AuthService } from './auth/services/auth.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './store/state';
import * as authStore from './auth/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'NgrxMultiStore';
  @ViewChild('sidenav') sidenav: ElementRef;
  navCollapse = false;
  loggedIn$;

  constructor(private store: Store<AppState>, private authService: AuthService) {
    this.loggedIn$ = this.store.select(authStore.AuthSelectors.isAuthenticated);
  }

  ngAfterViewInit(): void {
    setTimeout(()  => {
      this.authService.init();
    }, 500);
  }

  sideNavToggle(e): void {
    this.navCollapse = !this.navCollapse;
  }
}
