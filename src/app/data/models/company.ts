interface Company {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address?: Address;
  established: Date;
  metricId: number;
  stateLicense: string[];
  companySize: number;
  subscriptionType: number;
  userCount: number;
}

interface Address {
  street: string;
  city: string;
  zip?: string;
  country: string;
}

interface CompanyResponse {
  companies: Company[],
  page: number,
  limit: number;
  count: number;
}

export { Address, Company, CompanyResponse };
