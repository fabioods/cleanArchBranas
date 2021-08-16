import { ZipcodeCalculatorAPIMemory } from './ZipcodeCalculatorAPIMemory';

describe('ZipCode calculator', () => {
  it('deve calcular a distancia entre 2 ceps', () => {
    const zipCodeCalculator = new ZipcodeCalculatorAPIMemory();
    const distance = zipCodeCalculator.calculate('11.111-11', '11.111-20');
    expect(distance).toBe(1000);
  });
});
