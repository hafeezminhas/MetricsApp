import { Order } from './order';

export interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  orders: Order[]
  phone: string;
}
