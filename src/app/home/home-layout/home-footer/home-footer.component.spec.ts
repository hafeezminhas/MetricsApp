import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeFooterComponent } from './home-footer.component';

describe('HomeFooterComponent', () => {
  let component: HomeFooterComponent;
  let fixture: ComponentFixture<HomeFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFooterComponent ],
      imports: [
        MatIconModule,
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
