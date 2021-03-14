import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from './../../store/state';
import * as FromAuth from './../store';
import { Route } from '@angular/compiler/src/core';
import {AuthService} from '../services/auth.service';
import {AuthSelectors} from '../store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminModuleGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>, private authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.store.select(AuthSelectors.selectAuthUser).pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
        }
        if (user.role !== 'XADMIN') {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
