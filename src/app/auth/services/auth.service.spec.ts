import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({}, {})
      ],
      providers: [AuthService, HttpClient]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
