import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [UsersComponent, UserDialogComponent],
  imports: [
    CommonModule,

    MaterialModule
  ]
})
export class UsersModule { }
