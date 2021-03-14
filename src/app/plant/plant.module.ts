import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsComponent } from './plants/plants.component';
import {Route, RouterModule} from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { PlantDialogComponent } from './dialogs/plant-dialog/plant-dialog.component';
import { PlantBaseComponent } from './plant-base/plant-base.component';
import {MaterialModule} from '../material/material.module';

const routes: Route[] = [
  {
    path: '',
    component: PlantBaseComponent,
    children: [
      { path: '', component: PlantsComponent },
      { path: ':id', component: PlantComponent },
    ]
  },
];

@NgModule({
  declarations: [
    PlantsComponent,
    PlantComponent,
    PlantDialogComponent,
    PlantBaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [PlantDialogComponent]
})
export class PlantModule { }
