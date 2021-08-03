import { CreateCouponUseCase } from '../../../data/useCases/CreateCouponUseCase';
import { ListAllCouponsValidUseCase } from '../../../data/useCases/ListAllCouponsValidUseCase';
import { MemoryCouponRepository } from '../../../infra/repositories/implementation/MemoryCouponRepository';
import { DateFnsAdapter } from '../../../utils/dateFnsAdapter';
import { CreateCouponController } from '../createCoupon/CreateCouponController';
import { ListAllValidsCoupons } from './ListAllValidCouponsController';

describe('List all valids coupons', () => {
  it('should be able to return all valid coupons', async () => {
    const couponsRepository = new MemoryCouponRepository();
    const dateFnsAdapter = new DateFnsAdapter();

    const createCouponUseCase = new CreateCouponUseCase(
      couponsRepository,
      dateFnsAdapter
    );
    const createCouponController = new CreateCouponController(
      createCouponUseCase
    );

    const listCouponsUseCase = new ListAllCouponsValidUseCase(
      couponsRepository
    );
    const listCouponsController = new ListAllValidsCoupons(listCouponsUseCase);

    const coupon = {
      description: 'VALID_COUPON',
      expiresIn: new Date(2099, 12, 1),
      percentage: 1,
    };

    await createCouponController.handle({
      body: { coupon },
    });

    await createCouponController.handle({
      body: { coupon },
    });

    await createCouponController.handle({
      body: { coupon },
    });

    const response = await listCouponsController.handle({});

    expect(response.body.length).toBe(3);
  });
});
