/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VendorsComponent } from './vendors.component';

describe('VendorsComponent', () => {
  let component: VendorsComponent;
  let fixture: ComponentFixture<VendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
