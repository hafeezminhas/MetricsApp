import { Action, createReducer, on, createAction, props } from '@ngrx/store';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Credentials } from './../models/user';
import { User } from './../../auth/models/user';

export enum AuthActionTypes {
  INIT_AUTH     = '[Auth] INIT AUTH',
  LOGIN_REQUEST = '[Auth] Login Request',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGIN_SUCCESS = '[Auth] Login Success',
  UPDATE_TOKEN  = '[Auth] Update Token',
  APPLY_PROFILE = '[Auth] Apply Token',
  LOAD_PROFILE =  '[Auth] Load Token',
  REFRESH_TOKEN = '[Auth] Refresh Token',
  REFRESH_FAILURE= '[Auth] Refresh FAILURE',
  LOGOUT_ACTION = '[Auth] Logout Action',
  REGISTER_USER = '[Auth] Register User'
}

export class AuthActions {
  public static InitAction = createAction(
    AuthActionTypes.INIT_AUTH,
    props<{ token: string, refreshToken: string, user: any, isAuthenticated: boolean }>()
  );

  public static LoginRequestAction = createAction(
    AuthActionTypes.LOGIN_REQUEST,
    props<{ credentials: Credentials }>()
  );

  public static LoginFailureAction = createAction(
    AuthActionTypes.LOGIN_FAILURE,
    props<{ error: string }>()
  );

  public static LoginSuccessAction = createAction(
    AuthActionTypes.LOGIN_SUCCESS,
    props<{ user: User, token: string, refresh: string, isLoading: boolean }>()
  );

  public static UpdateTokenAction = createAction(
    AuthActionTypes.UPDATE_TOKEN,
    props<{ token: string }>()
  );

  public static LoadProfileAction = createAction(
    AuthActionTypes.LOAD_PROFILE,
    props<{ token: string, refreshToken: string, user: any }>()
  );

  public static ApplyProfileAction = createAction(
    AuthActionTypes.APPLY_PROFILE,
    props<{ user: any }>()
  );

  public static RefreshTokenAction = createAction(
    AuthActionTypes.REFRESH_TOKEN,
    props<{ refreshToken: string }>()
  );

  public static RefreshTokenFailureAction = createAction(
    AuthActionTypes.REFRESH_FAILURE,
    props<{ response: HttpErrorResponse }>()
  );

  public static LogoutAction = createAction(
    AuthActionTypes.LOGOUT_ACTION
  );

  public static RegisterUser = createAction(
    AuthActionTypes.REGISTER_USER,
    props<{ success: boolean, message: string }>()
  );
}
