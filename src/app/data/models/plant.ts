import {PlantPhaseHistory} from './phase-history';


interface Plant {
  name: string;
  metricId: string;
  strain: string;
  type: number;
  plantedOn?: Date;
  mother?: string;
  currentPhase: string;
  phaseHistory: PlantPhaseHistory[];
  location: string;
}

export { Plant };
