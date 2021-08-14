import { Item } from '../domain/entity/Item';

export interface FreightCalculator {
  calculateDistance(
    zipCodeOrigin: string,
    zipCodeDestination: string
  ): Promise<number>;

  calculatePrice(distance: number, item: Item): Promise<number>;
}
