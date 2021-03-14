import { ActionReducerMap } from '@ngrx/store';
import { authReducers } from '../auth/store/auth.reducer';
import { AuthState } from '../auth/store/state';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducers
};
