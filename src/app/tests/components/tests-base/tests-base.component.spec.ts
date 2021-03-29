import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsBaseComponent } from './tests-base.component';

describe('TestsBaseComponent', () => {
  let component: TestsBaseComponent;
  let fixture: ComponentFixture<TestsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
