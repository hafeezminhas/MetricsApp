import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/data/models/user';

const API_PREFIX = 'api';

class UsersServiceState {
  page: number;
  limit: number;
  users: User[];
  search: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  usersState$ = new BehaviorSubject<UsersServiceState>({
    page: 1,
    limit: 10,
    users: null,
    search: null
  });
  state$ = this.usersState$.asObservable();
  stateinit = false;

  constructor(private http: HttpClient) { }

  update(
    page: number = this.usersState$.value.page,
    limit: number = this.usersState$.value.limit,
    query?: string
  ): void {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())

    if (query) {
      params.set('search', `${query}`);
    }
    const url = `${API_PREFIX}/users?` + params.toString();

    this.http.get(url).subscribe((res: UsersServiceState) => {
      this.usersState$.next(res);
      this.stateinit = true;
    });
  }

  getUsers(page: number, limit: number, query?: string): Observable<any> {
    const current = this.usersState$.value;
    if (current.page === (page) && current.limit === limit) {
      return this.state$;
    } else {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());

      if (query) {
        params.set('search', `${query}`);
      }
      const url = `${API_PREFIX}/users?` + params.toString();
      return this.http.get(url).pipe(
        tap((res: UsersServiceState) => {
          this.usersState$.next(res);
          this.stateinit = true;
        })
      );
    }
  }

  addUser(payload: User): Observable<any> {
    return this.http.post(`${API_PREFIX}/users`, payload).pipe(
      tap(() => this.update())
    );
  }

  edit(id: string, payload: User): Observable<any> {
    return this.http.put(`${API_PREFIX}/users/${id}`, payload).pipe(
      tap(() => this.update())
    );
  }

}
