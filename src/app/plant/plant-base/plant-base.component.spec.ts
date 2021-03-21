import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantBaseComponent } from './plant-base.component';

describe('PlantBaseComponent', () => {
  let component: PlantBaseComponent;
  let fixture: ComponentFixture<PlantBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
