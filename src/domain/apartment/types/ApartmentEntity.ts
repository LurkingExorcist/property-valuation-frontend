import { CityEntity } from '@/domain/city';
import { ViewInWindowEntity } from '@/domain/view-in-window';

export type ApartmentEntity = {
  id: string;
  source: string;
  city: CityEntity;
  floor: number;
  totalArea: number;
  livingArea: number;
  kitchenArea: number;
  roomCount: number;
  height: number;
  isStudio: boolean;
  totalPrice: number;
  viewsInWindow: ViewInWindowEntity[];
};
