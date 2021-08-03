import { ICreateCoupon } from '../../../domain/useCases/ICreateCoupon';
import { HttpRequest, HttpResponse, IController } from '../../protocols';

export class CreateCouponController implements IController {
  private createCouponUseCase: ICreateCoupon;

  constructor(createCouponUseCase: ICreateCoupon) {
    this.createCouponUseCase = createCouponUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest;
    const { coupon } = body;
    try {
      const newCoupon = await this.createCouponUseCase.createCoupon(coupon);
      return {
        status: 200,
        body: newCoupon,
      };
    } catch (error) {
      return {
        status: 400,
        body: error.message,
      };
    }
  }
}
