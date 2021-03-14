import { AuthService } from './../services/auth.service';
import {map, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AuthSelectors } from './../store/auth.selectors';
import { AppState } from './../../store/state';
import {AuthRole} from '../models/enum/auth-role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isPermitted(next);
  }

  private isPermitted(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(AuthSelectors.selectAuthUser).pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
        }
        if (route.data.role && (AuthRole[user.role] < AuthRole[route.data.role])) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
