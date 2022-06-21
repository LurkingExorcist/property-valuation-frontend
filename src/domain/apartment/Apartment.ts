import { City } from '../city';
import { ViewInWindow } from '../view-in-window';

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
