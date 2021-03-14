import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as customerStore from './customer.reducer';

export const selectCustomerState = createFeatureSelector<customerStore.CustomerState>(customerStore.customerFeatureKey);

export const selectCustomers = createSelector(selectCustomerState, (state: customerStore.CustomerState) => state.customers);
