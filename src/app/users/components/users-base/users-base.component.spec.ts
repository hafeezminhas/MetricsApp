import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBaseComponent } from './users-base.component';

describe('UsersBaseComponent', () => {
  let component: UsersBaseComponent;
  let fixture: ComponentFixture<UsersBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
