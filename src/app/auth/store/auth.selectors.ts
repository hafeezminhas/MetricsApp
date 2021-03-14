import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { User } from './../../auth/models/user';
import { AuthState } from './state';
import { AppState } from './../../store/state';

const selectedFeature = (state: AppState) => state.auth;

export class AuthSelectors {

  public static token: MemoizedSelector<AppState, string> = createSelector(
    selectedFeature,
    (state: AuthState) => state.token
  );

  public static refreshToken: MemoizedSelector<AppState, string> = createSelector(
    selectedFeature,
    (state: AuthState) => state.refreshToken
  );

  public static isRefreshing: MemoizedSelector<AppState, boolean> = createSelector(
    selectedFeature,
    (state: AuthState) => state.isRefreshing
  );

  public static isAuthenticated: MemoizedSelector<AppState, boolean> = createSelector(
    selectedFeature,
    (state: AuthState) => state.isAuthenticated
  );

  public static selectAuthUser: MemoizedSelector<AppState, User> = createSelector(
    selectedFeature,
    (state: AuthState) => state.user
  );

  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectedFeature,
    (state: AuthState) => state.isLoading
  );

  public static selectAuthError: MemoizedSelector<AppState, string> = createSelector(
    selectedFeature,
    (state: AuthState) => state.error
  );
}
