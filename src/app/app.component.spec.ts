import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        LayoutModule,
        StoreModule.forRoot({}, {})
      ],
      declarations: [
        AppComponent
      ],
      providers: [Store]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MetricsMonitor'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MetricsMonitor');
  });
});
