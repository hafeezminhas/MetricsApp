import { PlantPhaseHistory } from './phase-history';

interface Plant {
  _id?: string;
  name: string;
  metricId: string;
  strain: string;
  type: number;
  plantedOn?: Date;
  mother?: string;
  currentPhase: string;
  phaseHistory: PlantPhaseHistory[];
  location: string;
  company: string;
}

interface PlantResponse {
  plants: Plant[],
  page: number,
  limit: number;
  count: number;
}

export { Plant, PlantResponse };
