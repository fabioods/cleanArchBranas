import { Item } from '../../../domain/entity/Item';
import { FakeFreightCalculator } from './FakeFreightCalculator';

describe('Calculate Freight', () => {
  it('should calculate distance between two places', async () => {
    const zipCodeOrigin = 'any_origin';
    const zipCodeDestination = 'any_destination';
    const freightCalculator = new FakeFreightCalculator();
    const distance = await freightCalculator.calculateDistance(
      zipCodeOrigin,
      zipCodeDestination
    );
    expect(distance).toBe(1000);
  });

  it('should calculate the price for an item', async () => {
    const distance = 1000;
    const item = new Item('any_description', 10, 10, 10, 10, 1000);
    const freightCalculator = new FakeFreightCalculator();
    const price = await freightCalculator.calculatePrice(distance, item);
    expect(price).toBe(100);
  });
});
