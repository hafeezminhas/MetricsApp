import { AppState } from './../../store/state';
import { AuthActions } from './../store/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { User, Credentials } from './../models/user';
import { Store } from '@ngrx/store';
import {AuthRole} from '../models/enum/auth-role';

const TOKEN_KEY = 'token';
const API_PREFIX = 'api';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  init(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.router.navigateByUrl('/dashboard');
      this.store.dispatch(AuthActions.InitAction({
        token: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refresh_token'),
        user: this.getUserFromToken(),
        isAuthenticated: true
      }));
    } else {
      this.logout();
    }
  }

  login(cred: Credentials): Observable<any> {
    if (cred.email === '' && cred.password === '') {
      return of({ success: false, message: 'please fill in the form' });
    }
    return this.http.post(`${API_PREFIX}/auth/login`, cred);
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(`${API_PREFIX}/auth/refresh`, token);
  }

  logout(): void {
    this.store.dispatch(AuthActions.LogoutAction());
    this.router.navigate(['/']);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUserFromToken(): User {
    const token = localStorage.getItem(TOKEN_KEY);
    const decoded: any = jwt_decode(token);
    return decoded;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return (new Date().valueOf() > date.valueOf());
  }

  isPermitted(route: Router | any, role: string): boolean {
    return (AuthRole[route.data.role] <= AuthRole[role]);
  }
}
