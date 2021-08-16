import CouponRepositoryMemory from './CouponRepositoryMemory';
import ItemRepositoryMemory from './ItemRepositoryMemory';
import OrderRepositoryMemory from './OrderRepositoryMemory';
import { PlaceOrder } from './PlaceOrder';
import { PlaceOrderInput } from './PlaceOrderInput';
import { ZipcodeCalculatorAPIMemory } from './ZipcodeCalculatorAPIMemory';

describe('Realizar pedido', () => {
  it('Deve fazer um pedido', async () => {
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
    expect(output.total).toBe(5982);
  });

  it('Deve fazer um pedido com cupom de desconto expirado', async () => {
    const valid_cpf = '778.278.412-36';

    const input = new PlaceOrderInput({
      cpf: valid_cpf,
      items: [
        { id: '1', quantity: 2 },
        { id: '2', quantity: 1 },
        { id: '3', quantity: 3 },
      ],
      coupon: 'VALE20_EXPIRED',
      zipcode: '11.111-11',
    });

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
    expect(output.total).toBe(7400);
  });

  it('Deve fazer um pedido com calculo de frete', async () => {
    const valid_cpf = '778.278.412-36';

    const input = {
      cpf: valid_cpf,
      items: [
        { id: '1', quantity: 2 },
        { id: '2', quantity: 1 },
        { id: '3', quantity: 3 },
      ],
      coupon: 'VALE20_EXPIRED',
      zipcode: '11.111-11',
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
    expect(output.freight).toBe(310);
  });
});
