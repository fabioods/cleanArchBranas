import { CouponRepositoryMemory } from '../../../infra/repository/memory/CouponRepositoryMemory';
import { CreateCoupon } from './CreateCoupon';

interface MakeSUT {
  createCoupon: CreateCoupon;
}

const makeSUT = (): MakeSUT => {
  const couponRepository = new CouponRepositoryMemory();
  const createCoupon = new CreateCoupon(couponRepository);
  return {
    createCoupon,
  };
};

describe('Create Coupon', () => {
  it('should create a new Coupon', async () => {
    const { createCoupon } = makeSUT();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const coupon = {
      description: 'any_coupon',
      percentage: 10,
      expiresIn: tomorrow,
    };
    const { coupon: newCoupon } = await createCoupon.execute(coupon);
    expect(newCoupon.id).toBe('1');
  });
});
