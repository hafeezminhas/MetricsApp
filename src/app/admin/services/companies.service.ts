import { Injectable } from '@angular/core';
import {Company} from '../../data/models/company';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {first, tap} from 'rxjs/operators';

const API_PREFIX = 'api';

class CompaniesServiceState {
  page: number;
  limit: number;
  companies: Company[];
  search: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  companiesState$ = new BehaviorSubject<CompaniesServiceState>({
    page: 1,
    limit: 10,
    companies: null,
    search: null
  });
  state$ = this.companiesState$.asObservable();
  stateinit = false;

  constructor(private http: HttpClient) {}

  update(page: number, limit: number, query?: string): void {
    const params = new HttpParams()
                            .set('page', page.toString())
                            .set('limit', limit.toString())
                            .set('search', query);
    const url = `${API_PREFIX}/companies?` + params.toString();

    this.http.get(url).subscribe((res: CompaniesServiceState) => {
      this.companiesState$.next(res);
      this.stateinit = true;
    });
  }

  getCompanies(page: number, limit: number, query?: string): Observable<any> {
    const current = this.companiesState$.value;
    if (current.page === (page) && current.limit === limit) {
      return this.state$;
    } else {
      const params = new HttpParams()
                              .set('page', page.toString())
                              .set('limit', limit.toString())
                              .set('search', query);
      const url = `${API_PREFIX}/companies?` + params.toString();
      return this.http.get(url).pipe(
        tap((res: CompaniesServiceState) => {
          this.companiesState$.next(res);
          this.stateinit = true;
        })
      );
    }
  }

  getCompany(id: string, full: boolean = false): Observable<any> {
    return this.http.get(`${API_PREFIX}/companies/${id}?full=${full}`);
  }

  addCompany(payload: any): Observable<any> {
    return this.http.post(`${API_PREFIX}/companies`, payload);
  }

  updateCompany(id: string, payload: any): Observable<any> {
    return this.http.put(`${API_PREFIX}/companies/${id}`, payload);
  }

  removeCompany(id: string, payload: any): Observable<any> {
    return this.http.put(`${API_PREFIX}/companies/${id}`, payload);
  }
}
