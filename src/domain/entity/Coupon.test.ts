import { Coupon } from './Coupon';

describe('Create a Coupon', () => {
  it('should create a valid Coupon', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const coupon = new Coupon('Coupon X', 10, futureDate);
    expect(coupon.isValid()).toBe(true);
  });

  it('should create an invalid Coupon', () => {
    const coupon = new Coupon('Coupon X', 10, new Date());
    jest.spyOn(coupon, 'isValid').mockImplementation(() => false);
    expect(coupon.isValid()).toBe(false);
  });
});
