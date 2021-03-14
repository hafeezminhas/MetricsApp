import { CustomerComponent } from './customer/customer.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';

const childRoutes: Routes = [
  { path: '', component: CustomersComponent },
  { path: ':id', component: CustomerComponent }
];

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ]
})
export class CustomerModule { }
