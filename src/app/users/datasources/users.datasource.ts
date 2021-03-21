import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize, flatMap, tap} from 'rxjs/operators';

import {UserServiceState, UsersService} from '../services/users.service';
import {User} from '../../data/models/user';

export class UsersDataSource implements DataSource<User> {

  private usersSubject$ = new BehaviorSubject<User[]>([]);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject$.asObservable();
  public count: number;

  constructor(private usersService: UsersService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject$.asObservable();
  }

  disconnect(collectionviewer: CollectionViewer): void {
    this.usersSubject$.complete();
    this.loadingSubject$.complete();
  }

  init(): void {
    this.loadingSubject$.next(true);
    this.usersService.state$.subscribe((res) => {
      this.loadingSubject$.next(res.pending);
      this.usersSubject$.next(res.users);
    });
  }
}
