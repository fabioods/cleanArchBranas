import { Coupon } from '../../src/domain/entity/Coupon';

describe('Test Coupon object creation', () => {
  it('verificar se o cupom está expirado', () => {
    const cupom = new Coupon('VALE20', 20, new Date('2020-10-10'));
    expect(cupom.isExpired()).toBe(true);
  });
});
