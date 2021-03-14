import { AuthSelectors } from './../store/auth.selectors';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AppState } from './../../store/state';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(AuthSelectors.isAuthenticated),
      map((isAuth) => {
        if (isAuth) {
          this.router.navigate(['/']);
        }

        return !isAuth;
      })
    );
  }

}
