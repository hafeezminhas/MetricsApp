import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Company } from '../../data/models/company';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CompaniesService } from '../services/companies.service';
import { catchError, finalize, first } from 'rxjs/operators';

export class CompaniesDataSource implements DataSource<Company> {

  private companiesSubject$ = new BehaviorSubject<Company[]>([]);
  private loadingSubject$ = new BehaviorSubject<boolean>(true);

  public loading$ = this.loadingSubject$.asObservable();
  public count: number;

  constructor(private companiesService: CompaniesService) { }

  connect(collectionViewer: CollectionViewer): Observable<Company[]> {
    return this.companiesSubject$.asObservable();
  }

  disconnect(collectionviewer: CollectionViewer): void {
    this.companiesSubject$.complete();
    this.loadingSubject$.complete();
  }


  init(): void {
    this.loadingSubject$.next(true);
    this.companiesService.state$.subscribe((res) => {
      this.loadingSubject$.next(res.pending);
      this.companiesSubject$.next(res.companies);
      this.count = res.count;
    });
  }
}
