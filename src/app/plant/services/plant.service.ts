import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

class PlantServiceState {
  plants: any;
  error: any;
  page: number;
  pages: number;
  limit: number;
}

const API_PREFIX = 'api';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private _state$ = new BehaviorSubject<PlantServiceState>({
    plants: null,
    error: null,
    page: 1,
    pages: 1,
    limit: 10
  });
  state$ = this._state$.asObservable();

  constructor() { }

  init() {}

  public subscribe(callback: (model: PlantServiceState) => void) {
    return this.state$.subscribe(callback);
  }
}
