interface Company {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address?: Address;
  established: Date;
  metricId: number;
  stateLicence: string[];
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

export { Address, Company };
