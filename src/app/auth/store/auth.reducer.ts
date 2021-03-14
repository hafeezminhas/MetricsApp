import { Action, createReducer, on } from '@ngrx/store';
import { User } from './../../auth/models/user';
import { AuthActions } from './auth.actions';
import { AuthState } from './state';

export const initialState: AuthState = new AuthState();

const reducer = createReducer(
  initialState,

  on(AuthActions.InitAction, (state, action) => ({
    ...state,
    token: action.token,
    refreshToken: action.refreshToken,
    user: action.user,
    isAuthenticated: true,
    isLoading: false
  })),

  on(AuthActions.LoginRequestAction, (state, action) => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.LoginFailureAction, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),

  on(AuthActions.LoginSuccessAction, (state, action) => ({
    ...state,
    user: action.user,
    token: action.token,
    isRefreshing: false,
    isAuthenticated: true,
    error: null,
    isLoading: false
  })),

  on(AuthActions.RefreshTokenAction, (state) => ({
    ...state,
    isRefreshing: true
  })),

  on(AuthActions.LoadProfileAction, (state, action) => ({
    ...state,
    token: action.token,
    refreshToken: action.refreshToken,
    user: action.user
  })),

  on(AuthActions.ApplyProfileAction, (state, action) => ({
    ...state,
    user: action.user
  })),

  on(AuthActions.LogoutAction, (state, action) => ({
    ...state,
    token: null,
    refreshToken: null,
    isAuthenticated: false
  }))
);

export function authReducers(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
