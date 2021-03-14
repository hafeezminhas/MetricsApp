import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../auth/services/auth.service';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { Store, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientModule,
        MatSidenavModule,
        MatListModule,
        StoreModule.forRoot({}, {})
      ],
      declarations: [ SidenavComponent ],
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
