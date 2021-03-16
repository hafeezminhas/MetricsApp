import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Plant} from '../../data/models/plant';
import {tap} from 'rxjs/operators';

class PlantServiceState {
  plants: any;
  page: number;
  limit: number;
  search: string;
  error: any;
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
    const params = new HttpParams()
                                .set('page', `${page}`)
                                .set('limit', `${limit}`)
                                .set('search', `${search}`);

    return this.http.get(`${API_PREFIX}/plants?` + params);
  }

  create(payload: Plant): Observable<any> {
    const curr = this.plantState$.value;
    return this.http.post(`${API_PREFIX}/plants`, payload).pipe(
      tap(() => this.update(curr.page, curr.limit))
    );
  }

  update(page: number, limit: number, search?: string): Observable<any> {
    const params = new HttpParams()
                            .set('page', `${page}`)
                            .set('limit', `${limit}`)
                            .set('search', `${search}`);

    return this.http.get(`${API_PREFIX}/plants?${params}`);
  }
}
