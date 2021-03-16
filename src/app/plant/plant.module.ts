import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';

import { PlantsComponent } from './plants/plants.component';
import { PlantComponent } from './plant/plant.component';
import {PlantBaseComponent} from './plant-base/plant-base.component';
import {PlantDialogComponent} from './dialogs/plant-dialog/plant-dialog.component';

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
