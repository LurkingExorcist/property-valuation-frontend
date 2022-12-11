import { Dataset } from './Dataset';
import { ModelTypeEntity } from './ModelTypeEntity';
import { TrainSummary } from './TrainSummary';

export type MathModelEntity = {
  id: string;
  name: string;
  modelType: ModelTypeEntity;
  formula: string;
  trainDataset: Dataset | null;
  trainSummary: TrainSummary | null;
  trainedDate: Date | null;
};
