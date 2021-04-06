import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AppState } from './../../store/state';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthService } from './../../auth/services/auth.service';

import { AuthResponse } from './../models/response';


@Injectable()
export class AuthEffects {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>) {}

  @Effect({ dispatch: false })
  init$ = this.actions$.pipe(
    ofType(AuthActions.InitAction),
    tap((action: any) => {
      this.router.navigate([this.router.url || '/dashboard']);
    })
  );

  @Effect()
  authorize$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.LoginRequestAction),
    switchMap((action: any) => {
      return this.authService.login({ email: action.email, password: action.password }).pipe(
        delay(1500),
        tap(res => {
          this.router.navigate(['/dashboard']);
        }),
        map((response: AuthResponse) => AuthActions.LoginSuccessAction({
            user: response.user,
            token: response.token,
            refresh: response.refreshToken,
            isLoading: false
        })),
        catchError((err) => of(AuthActions.LoginFailureAction({ error: err.error ? err.error.message : 'Error occurred while signing in user' })))
      );
    })
  );

  @Effect({ dispatch: false })
  authSuccess$ = this.actions$.pipe(
    ofType(AuthActions.LoginSuccessAction),
    map((action: any) => {
      localStorage.setItem('token', action.token);
      localStorage.setItem('refresh_token', action.refresh);
      this.router.navigateByUrl(this.router.url !== '/login' ? this.router.url : '/dashboard');
      setTimeout(() => this.document.defaultView.location.reload());
    })
  );

  @Effect({ dispatch: false })
  unauthorize$ = this.actions$.pipe(
    ofType(AuthActions.LogoutAction),
    map(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  );

  // @Effect()
  // refreshToken$ = this.actions$.pipe(
  //   ofType<AuthActions.RefreshTokenAction>(AuthActionTypes.REFRESH_TOKEN),
  //   withLatestFrom(this.store.select(AuthSelectors.refreshToken)),
  //   switchMap(([_, token]) => {
  //     return this.authService.refreshToken(token).pipe(
  //       map((refreshToken) => new AuthActions.A  ({ token: refreshToken })),
  //       catchError((response: HttpErrorResponse) => of(new AuthActions.RefreshTokenFailureAction({ response })))
  //     );
  //   })
  // );

  @Effect()
  updateToken$ = this.actions$.pipe(
    ofType(AuthActions.UpdateTokenAction),
    tap((action: any) => {
      localStorage.setItem('token', action.token);
    })
  );

  @Effect()
  updateTokenFailure$ = this.actions$.pipe(
    ofType(AuthActions.RefreshTokenFailureAction),
    map(() => AuthActions.LogoutAction)
  );
}
