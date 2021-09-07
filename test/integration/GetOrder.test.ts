import { PlaceOrder } from '../../src/application/PlaceOrder/PlaceOrder';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import { ZipcodeCalculatorAPIMemory } from '../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory';
import { GetOrder } from '../../src/application/GetOrder/GetOrder';

describe('Get pedido', () => {
  it('Deve consultar um pedido', async () => {
    const valid_cpf = '778.278.412-36';

    const input = {
      cpf: valid_cpf,
      items: [
        { id: '1', quantity: 2 },
        { id: '2', quantity: 1 },
        { id: '3', quantity: 3 },
      ],
      coupon: 'VALE20',
      zipcode: '11.111-11',
      issueDate: new Date(),
    };

    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(
      itemRepository,
      couponRepository,
      orderRepository,
      zipcodeCalculator
    );
    const output = await placeOrder.execute(input);
    const getOrder = new GetOrder(
      itemRepository,
      couponRepository,
      orderRepository
    );
    const getOrderOut = await getOrder.execute(output.code);
    expect(getOrderOut.total).toBe(5982);
  });
});
