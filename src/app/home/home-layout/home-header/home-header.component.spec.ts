/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, InjectionToken } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { WINDOW_PROVIDERS, WINDOW } from '../../../shared/helpers/window.helper';

import { HomeHeaderComponent } from './home-header.component';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

function createFakeDocument() {
  return {
    visibilityState: 'visible',
    appendChild: document.appendChild.bind(document),
    createElement: document.createElement.bind(document),
    addEventListener: document.addEventListener.bind(document),
    removeEventListener: document.removeEventListener.bind(document),
    querySelectorAll: document.querySelectorAll.bind(document),
    body: document.body,
  };
}

function creataeFakeWindow() {
  return Window;
}

describe('HomeHeaderComponent', () => {
  let component: HomeHeaderComponent;
  let fixture: ComponentFixture<HomeHeaderComponent>;
  let document;
  let window;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHeaderComponent ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatListModule
      ],
      providers: [
        { provide: DOCUMENT, useFactory: createFakeDocument },
        { provide: WINDOW, useFactory: window }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(HomeHeaderComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    const router = TestBed.inject(Router);
    const document = TestBed.inject(DOCUMENT);
    component = new HomeHeaderComponent(router, document, window);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
