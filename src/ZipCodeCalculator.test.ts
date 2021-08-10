import { ZipCodeCalculatorMemory } from './ZipCodeCalculatorMemory';

describe('ZipCode calculator', () => {
  it('deve calcular a distancia entre 2 ceps', () => {
    const zipCodeCalculator = new ZipCodeCalculatorMemory();
    const distance = zipCodeCalculator.calculate('11.111-11', '11.111-20');
    expect(distance).toBe(1000);
  });
});
