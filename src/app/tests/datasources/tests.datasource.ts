import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { TestsService } from '../services/tests.service';
import {Test} from '../../data/models/test';

export class TestsDatasource implements DataSource<Test> {

  private testsSubject$ = new BehaviorSubject<Test[]>([]);
  private loadingSubject$ = new BehaviorSubject<boolean>(true);

  public loading$ = this.loadingSubject$.asObservable();
  public count: number;

  constructor(private testsService: TestsService) { }

  connect(collectionViewer: CollectionViewer): Observable<Test[]> {
    return this.testsSubject$.asObservable();
  }

  disconnect(collectionviewer: CollectionViewer): void {
    this.testsSubject$.complete();
    this.loadingSubject$.complete();
  }

  init(): void {
    this.loadingSubject$.next(true);
    this.testsService.state$.subscribe((res) => {
      this.loadingSubject$.next(res.pending);
      this.testsSubject$.next(res.tests);
      this.count = res.count;
    });
  }
}
