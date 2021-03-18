import {PlantPhaseHistory} from './phase-history';

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

export { Plant };
