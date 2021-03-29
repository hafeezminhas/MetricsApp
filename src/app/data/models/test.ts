import {Company} from './company';

interface TestParams {
  _id?: string;
  date: Date;
  airTemp: number;
  airRH: number;
  co2: number;
  lightIntensity: number;
  waterPH: number;
  waterTDS: number;
  waterOxygen: number;
}

interface Test {
  _id?: string;
  name: string;
  description: string;
  plants: string[];
  testParams: TestParams[];
  company: Company | string;
  resultDate: Date;
  wetWeight: number;
  dryWeight: number;
  trimmedWeight: number;
  THCA: number;
  DELTATHC: number;
  THCVA: number;
  CBDA: number;
  CBGA: number;
  CBL: number;
  CBD: number;
  CBN: number;
  CBT: number;
  TAC: number;
}

interface TestResponse {
  tests: Test[];
  page: number;
  limit: number;
  count: number;
  search?: string;
}

export { TestParams, Test, TestResponse };
