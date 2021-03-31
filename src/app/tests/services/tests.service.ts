import { Injectable } from '@angular/core';
import {Test, TestResponse, TestUpdatePayload} from '../../data/models/test';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, finalize, tap} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';

class TestsServiceState {
  page: number;
  limit: number;
  tests: Test[];
  search: string;
  error: any;
  pending: boolean;
  count: number;
}

const API_BASE_URL = 'api/tests';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  private testsState$ = new BehaviorSubject<TestsServiceState>({
    tests: null,
    limit: 5,
    page: 1,
    search: null,
    error: null,
    pending: false,
    count: 0
  });
  initialized = false;

  constructor(private http: HttpClient) { }

  get state$(): Observable<TestsServiceState> {
    return this.testsState$.asObservable();
  }

  load(page: number = this.testsState$.value.page,
       limit: number = this.testsState$.value.limit,
       query?: string): void {
    if (this.initialized) {
      return;
    }
    this.testsState$.next({ ...this.testsState$.value, pending: true });
    const params = new HttpParams()
                                  .set('page', page.toString())
                                  .set('limit', limit.toString());
    if (query) {
      params.set('search', `${query}`);
    }

    const url = `${API_BASE_URL}?` + params.toString();

    this.http.get(url).pipe(
      catchError((error) => {
        this.testsState$.next({ ...this.testsState$.value, error });
        return throwError(error);
      }),
      tap((testResponse: TestResponse) => {
        this.initialized = true;
        this.testsState$.next({ ...this.testsState$.value, pending: false, ...testResponse, error: null });
      }),
      finalize(() => this.testsState$.next({ ...this.testsState$.value, pending: false }))
    ).subscribe();
  }

  searchTests(query: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/tests?search=${query}`);
  }

  getTest(id: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/${id}`);
  }

  create(payload: Test): Observable<any> {
    this.initialized = false;
    return this.http.post(`${API_BASE_URL}`, payload).pipe(
      tap(() => this.load())
    );
  }

  edit(id: string, payload: TestUpdatePayload): Observable<any> {
    this.initialized = false;
    return this.http.put(`${API_BASE_URL}/${id}`, payload).pipe(
      tap(() => this.load())
    );
  }

  remove(id: string): Observable<any> {
    this.initialized = false;
    return this.http.delete(`${API_BASE_URL}/${id}`).pipe(
      tap(() => this.load())
    );
  }

  changePage(pageEvent: PageEvent): void {
    this.initialized = false;
    this.testsState$.next({
      ...this.testsState$.value,
      limit: pageEvent.pageSize,
      page: pageEvent.pageIndex + 1
    });
    this.load();
  }

  update(page: number = this.testsState$.value.page,
         limit: number = this.testsState$.value.limit,
         search?: string): void {
    const params = new HttpParams()
      .set('page', `${page}`)
      .set('limit', `${limit}`);
    if (search) {
      params.set('search', `${search}`);
    }

    this.http.get(`${API_BASE_URL}?${params}`).subscribe((res: any) => {
      this.testsState$.next(res.tests);
    });
  }

}
