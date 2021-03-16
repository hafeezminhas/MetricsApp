import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  update(page: number, limit: number, query?: string): void {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', query);
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
        .set('limit', limit.toString())
        .set('search', query);
      const url = `${API_PREFIX}/users?` + params.toString();
      return this.http.get(url).pipe(
        tap((res: UsersServiceState) => {
          this.usersState$.next(res);
          this.stateinit = true;
        })
      );
    }
  }

  addUser(payload) {

  }

  updateUser(payload) {

  }

}
