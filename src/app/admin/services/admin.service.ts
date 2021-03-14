import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_PREFIX = 'api';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get(`${API_PREFIX}/admin/stats`);
  }
}
