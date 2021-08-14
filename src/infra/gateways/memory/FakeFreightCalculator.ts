/* eslint-disable @typescript-eslint/no-unused-vars */
import { Item } from '../../../domain/entity/Item';
import { FreightCalculator } from '../../../providers/FreightCalculator';

export class FakeFreightCalculator implements FreightCalculator {
  async calculatePrice(distance: number, item: Item): Promise<number> {
    const price = distance * item.getVolume() * (item.getDensity() / 100);
    return price < 10 ? 10 : price;
  }

  async calculateDistance(
    zipCodeOrigin: string,
    zipCodeDestination: string
  ): Promise<number> {
    return 1000;
  }
}
