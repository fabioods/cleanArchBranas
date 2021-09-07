import { Coupon } from '../../../domain/entity/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';
import Database from '../../database/Database';

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(private database: Database) {}

  async getByCode(code: string): Promise<Coupon | undefined> {
    const couponData = await this.database.one(
      'select * from ccca.coupon where code = $1',
      [code]
    );
    return new Coupon(
      couponData.code,
      couponData.percentage,
      new Date(couponData.expire_date)
    );
  }
}
