import { Item } from './Item';

export class FreightCalculator {
  static calculate(item: Item, distance: number): number {
    const price = distance * item.getVolume() * (item.getDensity() / 100);
    return price > 10 ? price : 10;
  }
}
