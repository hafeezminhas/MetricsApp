import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        StoreModule.forRoot({}, {})
      ],
      declarations: [ ToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
