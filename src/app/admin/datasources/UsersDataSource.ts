import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { User } from "src/app/auth/models/user";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UsersService } from "../services/users.service";
import { catchError, finalize, first } from 'rxjs/operators';

export class UsersDataSource implements DataSource<User> {

    private usersSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(true);

    public loading$ = this.loadingSubject.asObservable();
    public count: number;

    constructor(private usersService: UsersService) { }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    disconnect(collectionviewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

    loadUsers(page: number, limit: number, search?: string): void {
        this.loadingSubject.next(true);
        this.usersService.getUsers(page + 1, limit, search).pipe(
            first(),
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(res => {
            this.count = res.count;
            this.usersSubject.next(res.users);
        });
    }
}