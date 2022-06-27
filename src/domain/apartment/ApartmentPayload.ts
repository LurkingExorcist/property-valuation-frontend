export type ApartmentPayload = {
  cityId: string | undefined;
  floor: number;
  totalArea: number;
  livingArea: number;
  kitchenArea: number;
  roomCount: number;
  height: number;
  isStudio: boolean;
  totalPrice: number;
  viewsInWindowIds: string[];
};
