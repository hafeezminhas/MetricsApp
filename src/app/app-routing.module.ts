import {DashboardComponent} from './dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {AdminModuleGuard} from './auth/guards/admin-module.guard';

import {AuthGuard} from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'plants',
    loadChildren: () => import('./plant/plant.module').then(m => m.PlantModule),
    data: { role: 'USER' },
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { role: 'XADMIN' },
    canLoad: [AdminModuleGuard],
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
