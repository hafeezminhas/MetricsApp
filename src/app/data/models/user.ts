import { Address } from './address';
import { Company } from './company';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Address;
  role: string;
  password: string;
  company: Company;
  isActive: string;
  isLocked: string;
}
