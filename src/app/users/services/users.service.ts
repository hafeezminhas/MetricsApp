import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, finalize, tap} from 'rxjs/operators';
import {User} from '../../data/models/user';

const API_PREFIX = 'api';

export class UserServiceState {
  users: User[];
  error: any;
  pending: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersState$: BehaviorSubject<UserServiceState> = new BehaviorSubject<UserServiceState>({
    users: [],
    error: null,
    pending: false
  });
  initialized = false;

  constructor(private http: HttpClient) {}

  get state$(): Observable<UserServiceState> {
    return this.usersState$.asObservable();
  }

  load(): void {
    if (this.initialized) {
      return;
    }
    this.usersState$.next({ ...this.usersState$.value, pending: true });
    this.http.get(`${API_PREFIX}/users`).pipe(
      catchError((error) => {
        this.usersState$.next({ ...this.usersState$.value, error });
        return throwError(error);
      }),
      tap((users: User[]) => {
        this.initialized = true;
        this.usersState$.next({ pending: false, users, error: null });
      }),
      finalize(() => this.usersState$.next({ ...this.usersState$.value, pending: false }))
    ).subscribe();
  }

  getUser(id: string): Observable<User | any> {
    return this.http.get(`${API_PREFIX}/users/${id}`);
  }

  create(payload: User): Observable<User | any> {
    this.initialized = false;
    return this.http.post(`${API_PREFIX}/users`, payload).pipe(
      tap(() => this.load())
    );
  }

  update(id: string, payload: string): Observable<User | any> {
    this.initialized = false;
    return this.http.put(`${API_PREFIX}/users/${id}`, payload).pipe(
      tap(() => this.load())
    );
  }

  remove(id: string): Observable<User | any> {
    this.initialized = false;
    return this.http.delete(`${API_PREFIX}/users/${id}`).pipe(
      tap(() => this.load())
    );
  }
}
