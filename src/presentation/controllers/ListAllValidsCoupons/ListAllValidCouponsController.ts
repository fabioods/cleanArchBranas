import { IListAllCouponsValid } from '../../../domain/useCases/IListAllCouponsValid';
import { HttpRequest, HttpResponse, IController } from '../../protocols';

export class ListAllValidsCoupons implements IController {
  constructor(private listAllValidsCouponsUseCase: IListAllCouponsValid) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const couponsValid =
      await this.listAllValidsCouponsUseCase.listAllValidCoupons();
    return {
      status: 200,
      body: couponsValid,
    };
  }
}
