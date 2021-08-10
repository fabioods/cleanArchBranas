import { FreightCalculator } from './FreightCalculator';
import { Item } from './Item';

describe('Calculo de fretes', () => {
  it('Deve calcular o frete do amplificador', () => {
    const item = new Item('1', 'Amplificador', 5000, 50, 50, 50, 22);
    const distance = 1000;
    const price = FreightCalculator.calculate(item, distance);
    expect(price).toBe(220);
  });

  it('Deve calcular o frete do cabo', () => {
    const item = new Item('3', 'Cabo', 30, 10, 10, 10, 1);
    const distance = 1000;
    const price = FreightCalculator.calculate(item, distance);
    expect(price).toBe(10);
  });
});