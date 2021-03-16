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
    company: Company;
}
