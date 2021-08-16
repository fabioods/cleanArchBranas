import { Item } from '../../src/domain/entity/Item';

describe('Criação do objeto de item', () => {
  it('deve calcular o volume de um item', () => {
    const item = new Item('1', 'Amplificador', 5000, 50, 50, 50, 22);
    const volume = item.getVolume();
    expect(volume).toBe(0.125);
  });

  it('deve calcular a densidade de um item', () => {
    const item = new Item('1', 'Amplificador', 5000, 50, 50, 50, 22);
    const density = item.getDensity();
    expect(density).toBe(176);
  });
});
