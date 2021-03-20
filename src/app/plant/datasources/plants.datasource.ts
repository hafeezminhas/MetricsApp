import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize, first} from 'rxjs/operators';

import {PlantService} from '../services/plant.service';
import {Plant} from '../../data/models/plant';

export class PlantsDataSource implements DataSource<Plant> {

  private plantsSubject$ = new BehaviorSubject<Plant[]>([]);
  private loadingSubject$ = new BehaviorSubject<boolean>(true);

  public loading$ = this.loadingSubject$.asObservable();
  public count: number;

  constructor(private plantService: PlantService) {}

  connect(collectionViewer: CollectionViewer): Observable<Plant[]> {
    return this.plantsSubject$.asObservable();
  }

  disconnect(collectionviewer: CollectionViewer): void {
    this.plantsSubject$.complete();
    this.loadingSubject$.complete();
  }

  loadPlants(page: number, limit: number, search?: string): void {
    this.loadingSubject$.next(true);
    this.plantService.getPlants(page + 1, limit, search).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject$.next(false))
    ).subscribe(res => {
      this.count = res.count;
      this.plantsSubject$.next(res.plants);
    });
  }
}
