import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { UsersComponent } from './components/users/users.component';
import { UsersBaseComponent } from './components/users-base/users-base.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';

const routes: Route[] = [
  {
    path: '',
    component: UsersBaseComponent,
    children: [
      { path: '', component: UsersComponent }
    ]
  },
];

@NgModule({
  declarations: [
    UsersBaseComponent,
    UsersComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [
    UserDialogComponent
  ]
})
export class UsersModule { }
