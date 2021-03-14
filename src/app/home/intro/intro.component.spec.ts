import { MatIconModule } from '@angular/material/icon';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntroComponent } from './intro.component';
import { MatIcon } from '@angular/material/icon';

describe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroComponent ],
      imports: [MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
