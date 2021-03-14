import { User } from './../../auth/models/user';
import { AuthService } from './../../auth/services/auth.service';
import { AppState } from './../../store/state';
import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import * as authStore from '../../auth/store';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() navToggle = new  EventEmitter<any>();
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User>;

  constructor(private store: Store<AppState>, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(authStore.AuthSelectors.isAuthenticated);
    this.currentUser$ = this.store.select(authStore.AuthSelectors.selectAuthUser);
  }

  onNavToggle(): void {
    this.navToggle.emit(true);
  }

  signIn(): void {}

  signOut(): void {
    this.authService.logout();
  }
}
