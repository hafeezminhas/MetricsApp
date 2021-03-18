import { Address } from './address';
import { Company } from './company';

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: Address;
    role: string;
    company: Company;
    isActive: string;
    isLocked: string;
    password: string;
}
