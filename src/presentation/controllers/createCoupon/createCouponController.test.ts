import { CreateCouponUseCase } from '../../../data/useCases/CreateCouponUseCase';
import { CouponDTO } from '../../../domain/useCases/ICreateCoupon';
import { MemoryCouponRepository } from '../../../infra/repositories/implementation/MemoryCouponRepository';
import { DateFnsAdapter } from '../../../utils/dateFnsAdapter';
import { CreateCouponController } from './CreateCouponController';

describe('Criação de cupons', () => {
  it('should not be able to create a new coupon with no description', async () => {
    const createCouponRepository = new MemoryCouponRepository();
    const dateFnsAdapter = new DateFnsAdapter();
    const createCouponUseCase = new CreateCouponUseCase(
      createCouponRepository,
      dateFnsAdapter
    );
    const createCouponController = new CreateCouponController(
      createCouponUseCase
    );

    const coupon = {
      description: '',
      expiresIn: new Date(),
      percentage: 0,
    } as CouponDTO;

    const couponCreated = await createCouponController.handle({
      body: { coupon },
    });

    expect(couponCreated.body).toBe('Coupon description is required');
  });

  it('should not be able to create a new coupon with a date passed', async () => {
    const createCouponRepository = new MemoryCouponRepository();
    const dateFnsAdapter = new DateFnsAdapter();
    const createCouponUseCase = new CreateCouponUseCase(
      createCouponRepository,
      dateFnsAdapter
    );
    const createCouponController = new CreateCouponController(
      createCouponUseCase
    );

    const coupon = {
      description: 'VALID_COUPON',
      expiresIn: new Date(2021, 1, 1),
      percentage: 0,
    } as CouponDTO;

    const couponCreated = await createCouponController.handle({
      body: { coupon },
    });

    expect(couponCreated.body).toBe('Coupon expired is not allowed');
  });

  it('should not be able to create a new coupon with percentage less than 0', async () => {
    const createCouponRepository = new MemoryCouponRepository();
    const dateFnsAdapter = new DateFnsAdapter();
    const createCouponUseCase = new CreateCouponUseCase(
      createCouponRepository,
      dateFnsAdapter
    );
    const createCouponController = new CreateCouponController(
      createCouponUseCase
    );

    const coupon = {
      description: 'VALID_COUPON',
      expiresIn: new Date(2021, 12, 1),
      percentage: -20,
    } as CouponDTO;

    const couponCreated = await createCouponController.handle({
      body: { coupon },
    });

    expect(couponCreated.body).toBe('Percentage must be between 0 and 100');
  });

  it('should not be able to create a new coupon with percentage greater than 100', async () => {
    const createCouponRepository = new MemoryCouponRepository();
    const dateFnsAdapter = new DateFnsAdapter();
    const createCouponUseCase = new CreateCouponUseCase(
      createCouponRepository,
      dateFnsAdapter
    );
    const createCouponController = new CreateCouponController(
      createCouponUseCase
    );

    const coupon = {
      description: 'VALID_COUPON',
      expiresIn: new Date(2021, 12, 1),
      percentage: 101,
    } as CouponDTO;

    const couponCreated = await createCouponController.handle({
      body: { coupon },
    });

    expect(couponCreated.body).toBe('Percentage must be between 0 and 100');
  });
});
