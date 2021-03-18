export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone: string;
  address1: string;
  address2: string;
  town: string;
  postcode: string;
}

export interface Credentials {
  email: string;
  password: string;
}
