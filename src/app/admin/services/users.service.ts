import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User, UserResponse } from "src/app/auth/models/user";
import { catchError, finalize, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

const API_PREFIX = 'api';

export class UserServiceState {
  users: User[];
  error: any;
  pending: boolean;
  page: number;
  limit: number;
  search: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  usersState$ = new BehaviorSubject<UserServiceState>({
    users: null,
    error: null,
    pending: false,
    page: 1,
    limit: 5,
    search: null,
    count: 0
  });
  initialized = false;

  constructor(private http: HttpClient) { }

  get state$(): Observable<UserServiceState> {
    return this.usersState$.asObservable();
  }

  load(page: number = this.usersState$.value.page,
    limit: number = this.usersState$.value.limit,
    query?: string): void {
    if (this.initialized) {
      return;
    }
    this.usersState$.next({ ...this.usersState$.value, pending: true });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
    if (query) {
      params.set('search', `${query}`);
    }

    const url = `${API_PREFIX}/auth/users?` + params.toString();

    this.http.get(url).pipe(
      catchError((error) => {
        this.usersState$.next({ ...this.usersState$.value, error });
        return throwError(error);
      }),
      tap((userResponse: UserResponse) => {
        this.initialized = true;
        this.usersState$.next({ ...this.usersState$.value, pending: false, ...userResponse, error: null });
      }),
      finalize(() => this.usersState$.next({ ...this.usersState$.value, pending: false }))
    ).subscribe();
  }

  changePage(pageEvent: PageEvent) {
    this.initialized = false;
    this.usersState$.next({
      ...this.usersState$.value,
      limit: pageEvent.pageSize,
      page: pageEvent.pageIndex + 1
    })
    this.load();
  }

  addUser(payload: User): Observable<any> {
    this.initialized = false;
    return this.http.post(`${API_PREFIX}/auth/users`, payload).pipe(
      tap(() => this.load())
    );
  }

  edit(id: string, payload: User): Observable<any> {
    this.initialized = false;
    return this.http.put(`${API_PREFIX}/auth/users/${id}`, payload).pipe(
      tap(() => this.load())
    );
  }

}
