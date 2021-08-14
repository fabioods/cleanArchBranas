import { FakeFreightCalculator } from './FakeFreightCalculator';

describe('Calculate Freight', () => {
  it('should calculate distance between two places', async () => {
    const zipCodeOrigin = 'any_origin';
    const zipCodeDestination = 'any_destination';
    const freightCalculator = new FakeFreightCalculator();
    const distance = await freightCalculator.calculate(
      zipCodeOrigin,
      zipCodeDestination
    );
    expect(distance).toBe(1000);
  });
});
