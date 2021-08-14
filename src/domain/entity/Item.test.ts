import { Item } from './Item';

describe('Create an item object', () => {
  it('should create an item object', () => {
    const item = new Item('any_description', 1, 1, 1, 1, 1);
    expect(item).toBeTruthy();
  });

  it('should not create an item with negative values', () => {
    expect(() => new Item('any_description', -1, 1, 1, 1, 1)).toThrow(
      new Error('Invalid height, width, length, weight or price')
    );
  });

  it('should create an item with volume 0,001', () => {
    const item = new Item('any_description', 10, 10, 10, 10, 1000);
    expect(item.getVolume()).toBe(0.001);
  });

  it('should create an item with density 10000', () => {
    const item = new Item('any_description', 10, 10, 10, 10, 1000);
    expect(item.getDensity()).toBe(10000);
  });
});
