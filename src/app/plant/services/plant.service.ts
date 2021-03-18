import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Plant} from '../../data/models/plant';
import {tap} from 'rxjs/operators';

class PlantServiceState {
  plants: any;
  page: number;
  limit: number;
  search?: string;
  error?: any;
}

const API_PREFIX = 'api';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private plantState$ = new BehaviorSubject<PlantServiceState>({
    plants: null,
    page: 1,
    limit: 10,
    search: null,
    error: null,
  });
  state$ = this.plantState$.asObservable();

  constructor(private http: HttpClient) { }

  getPlants(page: number, limit: number, search?: string): Observable<any> {
    const current = this.plantState$.value;
    if (current.page === (page) && current.limit === limit) {
      return this.state$;
    } else {
      const params = new HttpParams()
        .set('page', `${page}`)
        .set('limit', `${limit}`);
      if (search) {
        params.set('search', `${search}`);
      }

      return this.http.get(`${API_PREFIX}/plants?` + params).pipe(
        tap((res: PlantServiceState) => {
          this.plantState$.next(res.plants);
        })
      );
    }
  }

  searchPlants(query: string): Observable<any> {
    return this.http.get(`${API_PREFIX}/plants?search=${query}`);
  }

  create(payload: Plant): Observable<any> {
    return this.http.post(`${API_PREFIX}/plants`, payload).pipe(
      tap(() => this.update())
    );
  }

  edit(id: string, payload: Plant): Observable<any> {
    return this.http.put(`${API_PREFIX}/plants/${id}`, payload).pipe(
      tap(() => this.update())
    );
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${API_PREFIX}/plants/${id}`).pipe(
      tap(() => this.update())
    );
  }

  update(page: number= this.plantState$.value.page,
         limit: number= this.plantState$.value.limit,
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
