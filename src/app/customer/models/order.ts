export interface Order {
  _id: string;
  title: string;
  description: string;
  created: Date;
  updated: Date;
  status: string;
  notes: string[];
}
