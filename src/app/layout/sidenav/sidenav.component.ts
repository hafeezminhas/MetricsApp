import { AppState } from './../../store/state';
import { AuthService } from './../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import * as authStore from '../../auth/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() collapsed: boolean;

  constructor(private store: Store<AppState>, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(authStore.AuthSelectors.isAuthenticated);
  }

  toggleNav(): void {
    this.sidenav.toggle();
  }
}
