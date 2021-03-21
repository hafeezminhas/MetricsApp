import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {Route, RouterModule} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import {MaterialModule} from '../material/material.module';
import { CompanyDialogComponent } from './dialogs/company-dialog/company-dialog.component';
import {UserDialogComponent} from './dialogs/user-dialog/user-dialog.component';
import {SharedModule} from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

const routes: Route[] = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent, pathMatch: 'full' },
      { path: 'companies', component: CompanyManagementComponent },
      { path: 'users', component: UserManagementComponent },
    ]
  },
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    CompanyManagementComponent,
    UserManagementComponent,
    AdminComponent,
    CompanyDialogComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    NgxMaskModule.forChild()
  ],
  exports: [RouterModule],
  entryComponents: [CompanyDialogComponent, UserDialogComponent]
})

export class AdminModule { }
