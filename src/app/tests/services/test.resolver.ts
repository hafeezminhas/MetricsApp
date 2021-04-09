import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError, delay, tap} from 'rxjs/operators';
import {TestsService} from './tests.service';
import {NgPopupsService} from 'ng-popups';

@Injectable({
  providedIn: 'root'
})
export class TestResolver implements Resolve<boolean> {

  constructor(private ngPopup: NgPopupsService, private testsService: TestsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.testsService.getTest(route.params.id).pipe(
      catchError(err => {
        if (err.status === 404) {
          this.ngPopup.alert(`The requested test object not found`, { title: 'Test Not Found', okButtonText: 'Ok' });
        }
        throw err;
      })
    );
  }
}
