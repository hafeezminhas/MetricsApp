import { createAction, props } from '@ngrx/store';
import { Company } from '../../models/customer';

export const loadCustomers = createAction(
  '[Customer] Load Customers',
);

export const addCustomer = createAction(
  '[Customer] Add Customer',
  (customer: Company) => ({customer})
);
