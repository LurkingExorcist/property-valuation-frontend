import { DatasetEntity } from '@/domain/dataset';

import { ModelTypeEntity } from './ModelTypeEntity';
import { TrainSummary } from './TrainSummary';

export type MathModelEntity = {
  id: string;
  name: string;
  modelType: ModelTypeEntity;
  formula: string;
  trainDataset: DatasetEntity | null;
  trainSummary: TrainSummary | null;
  trainedDate: Date | null;
};
