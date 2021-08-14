import { Coupon } from '../../../domain/entity/Coupon';
import { CouponRepository } from '../../../domain/repository/CouponRepository';
import { CreateCouponInput, CreateCouponOutput } from './CreateCouponDTO';

export class CreateCoupon {
  constructor(private couponRepository: CouponRepository) {}

  async execute(data: CreateCouponInput): Promise<CreateCouponOutput> {
    const coupon = new Coupon(
      data.description,
      data.percentage,
      data.expiresIn
    );
    const createdCoupon = await this.couponRepository.save(coupon);
    return { coupon: createdCoupon };
  }
}
