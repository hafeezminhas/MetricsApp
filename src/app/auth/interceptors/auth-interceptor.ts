import { AuthSelectors } from './../store/auth.selectors';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthService } from './../services/auth.service';
import * as FromAuth from './../store';
import {first, mergeMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService, private store: Store<FromAuth.AuthSelectors>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.isTokenExpired() ? null : this.authService.getToken();
    const authReq = !!token ? request.clone({
      url: request.url,
      setHeaders: {
        [AUTH_HEADER_KEY]: `${token}`
      },
    }) : request;

    return next.handle(authReq).pipe(
      tap(() => {
      }, (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.authService.logout();
          // this.router.navigate(['login']);
        }
      }),
    );
  }
}
