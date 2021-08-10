import { Item } from './Item';

export class FreightCalculator {
  static calculate(item: Item, distance: number): number {
    return distance * item.getVolume() * (item.getDensity() / 100);
  }
}
