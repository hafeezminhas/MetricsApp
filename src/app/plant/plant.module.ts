import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsComponent } from './plants/plants.component';
import {Route, RouterModule} from '@angular/router';
import { PlantComponent } from './plant/plant.component';

const routes: Route[] = [
  { path: '', component: PlantsComponent },
  { path: '/:id', component: PlantComponent },
];

@NgModule({
  declarations: [PlantsComponent, PlantComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PlantModule { }
