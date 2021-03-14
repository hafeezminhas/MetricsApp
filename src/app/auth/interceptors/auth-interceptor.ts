import { AuthSelectors } from './../store/auth.selectors';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthService } from './../services/auth.service';
import * as FromAuth from './../store';
import { first, mergeMap } from 'rxjs/operators';
const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<FromAuth.AuthSelectors>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.isTokenExpired() ? null : this.authService.getToken();
    const authReq = !!token ? request.clone({
      url: request.url,
      setHeaders: {
        Authorization: `${token}`
      },
    }) : request;

    return next.handle(authReq);
  }
}
