import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, finalize, tap} from 'rxjs/operators';
import {User} from '../../data/models/user';

const API_PREFIX = 'users';

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

  state$ = this.usersState$.asObservable();

  constructor(private http: HttpClient) { }

  load(): void {
    this.usersState$.next({ ...this.usersState$.value, pending: true });
    this.http.get(`${API_PREFIX}/users`).pipe(
      catchError((error) => {
        this.usersState$.next({ ...this.usersState$.value, error });
        return throwError(error);
      }),
      tap((users: User[]) => {
        this.usersState$.next({ ...this.usersState$.value, users });
      }),
      finalize(() => this.usersState$.next({ ...this.usersState$.value, pending: false }))
    );
  }

  getUser(id: string): Observable<User | any> {
    return this.http.get(`${API_PREFIX}/users/${id}`);
  }

  create(payload: User): Observable<User | any> {
    return this.http.post(`${API_PREFIX}/users`, payload).pipe(
      tap(() => this.load())
    );
  }

  update(id: string, payload: string): Observable<User | any> {
    return this.http.put(`${API_PREFIX}/users/${id}`, payload).pipe(
      tap(() => this.load())
    );
  }

  remove(id: string): Observable<User | any> {
    return this.http.delete(`${API_PREFIX}/users/${id}`).pipe(
      tap(() => this.load())
    );
  }
}
