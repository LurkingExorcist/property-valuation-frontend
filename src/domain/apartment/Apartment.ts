import { City } from '../City';
import { ViewInWindow } from '../ViewInWindow';

export type Apartment = {
  id: string;
  city: City;
  floor: number;
  totalArea: number;
  livingArea: number;
  kitchenArea: number;
  roomCount: number;
  height: number;
  isStudio: boolean;
  totalPrice: number;
  viewsInWindow: ViewInWindow[];
};
