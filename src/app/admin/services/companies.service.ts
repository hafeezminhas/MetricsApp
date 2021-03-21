import { Injectable } from '@angular/core';
import { Company, CompanyResponse } from '../../data/models/company';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

const API_PREFIX = 'api';

class CompaniesServiceState {
  page: number;
  limit: number;
  companies: Company[];
  search: string;
  error: any;
  pending: boolean;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  companiesState$ = new BehaviorSubject<CompaniesServiceState>({
    page: 1,
    limit: 5,
    companies: null,
    search: null,
    error: null,
    pending: false,
    count: 0
  });
  initialized = false;

  constructor(private http: HttpClient) { }

  get state$(): Observable<CompaniesServiceState> {
    return this.companiesState$.asObservable();
  }

  load(page: number = this.companiesState$.value.page,
    limit: number = this.companiesState$.value.limit,
    query?: string): void {
    if (this.initialized) {
      return;
    }
    this.companiesState$.next({ ...this.companiesState$.value, pending: true });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
    if (query) {
      params.set('search', `${query}`);
    }

    const url = `${API_PREFIX}/companies?` + params.toString();

    this.http.get(url).pipe(
      catchError((error) => {
        this.companiesState$.next({ ...this.companiesState$.value, error });
        return throwError(error);
      }),
      tap((companyResponse: CompanyResponse) => {
        this.initialized = true;
        this.companiesState$.next({ ...this.companiesState$.value, pending: false, ...companyResponse, error: null });
      }),
      finalize(() => this.companiesState$.next({ ...this.companiesState$.value, pending: false }))
    ).subscribe();
  }

  changePage(pageEvent: PageEvent) {
    this.initialized = false;
    this.companiesState$.next({
      ...this.companiesState$.value,
      limit: pageEvent.pageSize,
      page: pageEvent.pageIndex + 1
    })
    this.load();
  }

  getCompany(id: string, full: boolean = false): Observable<any> {
    return this.http.get(`${API_PREFIX}/companies/${id}?full=${full}`);
  }

  addCompany(payload: any): Observable<any> {
    this.initialized = false;
    return this.http.post(`${API_PREFIX}/companies`, payload).pipe(
      tap(() => this.load())
    );
  }

  updateCompany(id: string, payload: any): Observable<any> {
    this.initialized = false;
    return this.http.put(`${API_PREFIX}/companies/${id}`, payload).pipe(
      tap(() => this.load())
    );
  }

  removeCompany(id: string, payload: any): Observable<any> {
    this.initialized = false;
    return this.http.put(`${API_PREFIX}/companies/${id}`, payload).pipe(
      tap(() => this.load())
    );
  }

  searchCompany(query: string): Observable<any> {
    return this.http.get(`${API_PREFIX}/companies?search=${query}`);
  }
}
