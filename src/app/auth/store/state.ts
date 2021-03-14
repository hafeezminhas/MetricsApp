import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { User } from '../../auth/models/user';
export const authFeatureKey = 'auth';

const TOKEN_KEY = 'token';
const token = localStorage.getItem('TOKEN_KEY');

export class AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
  error: string | null;

  token: string;
  refreshToken: string;
  isRefreshing: boolean;

  constructor() {
    const tok = localStorage.getItem(TOKEN_KEY) || null;
    if (tok) {
      const decoded: any = jwt_decode(tok);
      const expiry = new Date(0);
      expiry.setUTCSeconds(decoded.exp);
      this.isAuthenticated = expiry.valueOf() > new Date().valueOf();
      this.user = decoded;
      this.token = token;
    } else {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
    }
    this.refreshToken = localStorage.getItem('refresh_token') || null;
    this.isRefreshing = false;
  }
}

