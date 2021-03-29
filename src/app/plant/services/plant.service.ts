import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plant, PlantResponse } from '../../data/models/plant';
import { catchError, count, finalize, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

class PlantServiceState {
  page: number;
  limit: number;
  plants: Plant[];
  search: string;
  error: any;
  pending: boolean;
  count: number;
}

const API_PREFIX = 'api';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private plantState$ = new BehaviorSubject<PlantServiceState>({
    plants: null,
    limit: 5,
    page: 1,
    search: null,
    error: null,
    pending: false,
    count: 0
  });
  initialized = false;

  constructor(private http: HttpClient) { }

  get state$(): Observable<PlantServiceState> {
    return this.plantState$.asObservable();
  }

  load(page: number = this.plantState$.value.page,
    limit: number = this.plantState$.value.limit,
    query?: string): void {
    if (this.initialized) {
      return;
    }
    this.plantState$.next({ ...this.plantState$.value, pending: true });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
    if (query) {
      params.set('search', `${query}`);
    }

    const url = `${API_PREFIX}/plants?` + params.toString();

    this.http.get(url).pipe(
      catchError((error) => {
        this.plantState$.next({ ...this.plantState$.value, error });
        return throwError(error);
      }),
      tap((plantResponse: PlantResponse) => {
        this.initialized = true;
        this.plantState$.next({ ...this.plantState$.value, pending: false, ...plantResponse, error: null });
      }),
      finalize(() => this.plantState$.next({ ...this.plantState$.value, pending: false }))
    ).subscribe();
  }

  searchPlants(query: string): Observable<any> {
    return this.http.get(`${API_PREFIX}/plants?search=${query}`);
  }

  create(payload: Plant): Observable<any> {
    this.initialized = false;
    return this.http.post(`${API_PREFIX}/plants`, payload).pipe(
      tap(() => this.load())
    );
  }

  edit(id: string, payload: Plant): Observable<any> {
    this.initialized = false;
    return this.http.put(`${API_PREFIX}/plants/${id}`, payload).pipe(
      tap(() => this.load())
    );
  }

  remove(id: string): Observable<any> {
    this.initialized = false;
    return this.http.delete(`${API_PREFIX}/plants/${id}`).pipe(
      tap(() => this.load())
    );
  }

  changePage(pageEvent: PageEvent) {
    this.initialized = false;
    this.plantState$.next({
      ...this.plantState$.value,
      limit: pageEvent.pageSize,
      page: pageEvent.pageIndex + 1
    })
    this.load();
  }

  update(page: number = this.plantState$.value.page,
    limit: number = this.plantState$.value.limit,
    search?: string): void {
    const params = new HttpParams()
      .set('page', `${page}`)
      .set('limit', `${limit}`);
    if (search) {
      params.set('search', `${search}`);
    }

    this.http.get(`${API_PREFIX}/plants?${params}`).subscribe((res: any) => {
      this.plantState$.next(res.plants);
    });
  }
}
