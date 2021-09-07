import { PlaceOrder } from '../../src/application/PlaceOrder/PlaceOrder';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import { ZipcodeCalculatorAPIMemory } from '../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory';
import { ItemRepositoryPGDatabase } from '../../src/infra/repository/database/ItemRepositoryPgDatabase';
import PgPromiseDatabase from '../../src/infra/database/PgPromiseDatabase';
import { PlaceOrderInput } from '../../src/application/PlaceOrder/PlaceOrderInput';
import { CouponRepositoryDatabase } from '../../src/infra/repository/database/CupomRepositoryDatabase';
import { OrderRepositoryDatabase } from '../../src/infra/repository/database/OrderRepositoryDatabase';

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
    expect(output.total).toBe(5982);
  });

  it('Deve fazer um pedido conectando no Postgres', async () => {
    const valid_cpf = '778.278.412-36';

    const input = {
      cpf: valid_cpf,
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 3 },
      ],
      coupon: 'VALE20',
      zipcode: '11.111-11',
      issueDate: new Date(),
    };

    const itemRepository = new ItemRepositoryPGDatabase(
      PgPromiseDatabase.getInstance()
    );
    const couponRepository = new CouponRepositoryDatabase(
      PgPromiseDatabase.getInstance()
    );
    const orderRepository = new OrderRepositoryDatabase(
      PgPromiseDatabase.getInstance()
    );
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
      issueDate: new Date(),
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
    expect(output.freight).toBe(310);
  });

  it('Deve fazer um pedido calculando o código', async () => {
    const valid_cpf = '778.278.412-36';

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
    const output = await placeOrder.execute({
      cpf: valid_cpf,
      items: [
        { id: '1', quantity: 2 },
        { id: '2', quantity: 1 },
        { id: '3', quantity: 3 },
      ],
      coupon: 'VALE20_EXPIRED',
      zipcode: '11.111-11',
      issueDate: new Date('2020-10-10'),
    });
    expect(output.code).toBe('202000000001');
  });
});
