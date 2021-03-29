import {DashboardComponent} from './dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {AdminModuleGuard} from './auth/guards/admin-module.guard';

import {AuthGuard} from './auth/guards/auth.guard';
import {TestResolver} from './tests/services/test.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { role: 'USER' },
    canActivate: [AuthGuard]
  },
  {
    path: 'plants',
    loadChildren: () => import('./plant/plant.module').then(m => m.PlantModule),
    data: { role: 'USER' },
    canActivate: [AuthGuard]
  },
  {
    path: 'tests',
    loadChildren: () => import('./tests/tests.module').then(m => m.TestsModule),
    data: { role: 'USER' },
    canActivate: [AuthGuard],
    resolve: {

    }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    data: { role: 'ADMIN' },
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
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
