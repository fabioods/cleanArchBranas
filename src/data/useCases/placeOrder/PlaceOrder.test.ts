import { PgPromiseDatabase } from '../../../infra/database/PgPromiseDatabase';
import { FakeFreightCalculator } from '../../../infra/gateways/memory/FakeFreightCalculator';
import { ItemRepositoryPgDatabase } from '../../../infra/repository/database/ItemRepositoryPgDatabase';
import { CouponRepositoryMemory } from '../../../infra/repository/memory/CouponRepositoryMemory';
import { ItemRepositoryMemory } from '../../../infra/repository/memory/ItemRepositoryMemory';
import { OrderRepositoryMemory } from '../../../infra/repository/memory/OrderRepositoryMemory';
import { UserRepositoryMemory } from '../../../infra/repository/memory/UserRepositoryMemory';
import { CPFValidator } from '../../../utils/cpfValidator/cpfValidator';
import { CreateCoupon } from '../createCoupon/CreateCoupon';
import { CreateCouponInput } from '../createCoupon/CreateCouponDTO';
import { CreateItem } from '../createItem/CreateItem';
import { CreateUser } from '../createUser/CreateUser';
import { PlaceOrder } from './PlaceOrder';
import { PlaceOrderInput } from './PlaceOrderDTO';

interface MakeSUT {
  placeOrder: PlaceOrder;
  placeOrderDb: PlaceOrder;
  createUser: CreateUser;
  createItem: CreateItem;
  createCoupon: CreateCoupon;
}

const cpfValidatorAdapter = (): CPFValidator => {
  class CPFValidatorAdapter implements CPFValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(cpf: string): boolean {
      return true;
    }
  }
  return new CPFValidatorAdapter();
};

const makeSUT = (): MakeSUT => {
  const userRepository = new UserRepositoryMemory();
  const cpfValidator = cpfValidatorAdapter();
  const createUser = new CreateUser(cpfValidator, userRepository);

  const itemRepository = new ItemRepositoryMemory();
  const createItem = new CreateItem(itemRepository);

  const itemRepositoryPgDatabase = new ItemRepositoryPgDatabase(
    new PgPromiseDatabase()
  );

  const couponRepository = new CouponRepositoryMemory();
  const createCoupon = new CreateCoupon(couponRepository);

  const orderRepository = new OrderRepositoryMemory();
  const freightCalculator = new FakeFreightCalculator();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    userRepository,
    couponRepository,
    freightCalculator
  );

  const placeOrderDb = new PlaceOrder(
    itemRepositoryPgDatabase,
    orderRepository,
    userRepository,
    couponRepository,
    freightCalculator
  );

  return { placeOrder, createUser, createItem, createCoupon, placeOrderDb };
};

describe('Place a new Order', () => {
  it('should not create a new Order with no items', async () => {
    const { placeOrder, createUser } = makeSUT();
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });
    const newOrder = placeOrder.execute({
      user_id: user.id,
      items: [],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    await expect(newOrder).rejects.toThrow();
  });

  it('should not create a new Order with no user defined', async () => {
    const { placeOrder } = makeSUT();
    const newOrder = placeOrder.execute({
      user_id: null,
      items: [],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    await expect(newOrder).rejects.toThrow();
  });

  it('should not create a new Order with an item id who does not exists', async () => {
    const { placeOrder, createUser } = makeSUT();
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });
    const newOrder = placeOrder.execute({
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    await expect(newOrder).rejects.toThrow();
  });

  it('should not create a new Order with an user who does not exists', async () => {
    const { placeOrder } = makeSUT();
    const newOrder = placeOrder.execute({
      user_id: '1',
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    await expect(newOrder).rejects.toThrow();
  });

  it('should create a new Order with some items', async () => {
    const { placeOrder, createUser, createItem } = makeSUT();
    const guitarra = {
      description: 'Guitarra',
      height: 50,
      width: 100,
      length: 15,
      weight: 3,
      price: 1000,
    };
    await createItem.execute(guitarra);
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });

    const { total } = await placeOrder.execute({
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    expect(total).toBe(2060);
  });

  it('should create a new Order with some items in Database', async () => {
    const { placeOrderDb, createUser } = makeSUT();

    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });

    const { total } = await placeOrderDb.execute({
      user_id: user.id,
      items: [
        {
          id: '37341e45-afb0-4421-b0be-765cb4c85c47',
          quantity: 2,
        },
      ],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    expect(total).toBe(2060);
  });

  it('should not create a new Order with a coupon who does not exists', async () => {
    const { placeOrder, createUser, createItem } = makeSUT();
    const guitarra = {
      description: 'Guitarra',
      height: 50,
      width: 100,
      length: 15,
      weight: 3,
      price: 1000,
    };
    await createItem.execute(guitarra);
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });

    const order = {
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
      coupon_code: 'any_coupon',
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    } as PlaceOrderInput;
    const placeOrderOutput = placeOrder.execute(order);
    await expect(placeOrderOutput).rejects.toThrow();
  });

  it('should create a new Order with a valid coupon', async () => {
    const { placeOrder, createUser, createItem, createCoupon } = makeSUT();
    const guitarra = {
      description: 'Guitarra',
      height: 50,
      width: 100,
      length: 15,
      weight: 3,
      price: 1000,
    };
    await createItem.execute(guitarra);
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const couponVale20 = {
      description: 'VALE20',
      percentage: 20,
      expiresIn: tomorrow,
    } as CreateCouponInput;
    await createCoupon.execute(couponVale20);

    const { total } = await placeOrder.execute({
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
      coupon_code: 'VALE20',
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    expect(total).toBe(1660);
  });

  it('should create a new Order with freight', async () => {
    const { placeOrder, createUser, createItem } = makeSUT();
    const guitarra = {
      description: 'Guitarra',
      height: 50,
      width: 100,
      length: 15,
      weight: 3,
      price: 1000,
    };
    await createItem.execute(guitarra);
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });
    const { freight } = await placeOrder.execute({
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    expect(freight).toBe(60);
  });

  it('should create a new Order with correct pattern', async () => {
    const { placeOrder, createUser, createItem } = makeSUT();
    const guitarra = {
      description: 'Guitarra',
      height: 50,
      width: 100,
      length: 15,
      weight: 3,
      price: 1000,
    };
    await createItem.execute(guitarra);
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });
    const { order_id } = await placeOrder.execute({
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    const orderId = `${new Date().getFullYear()}00000001`;
    expect(order_id).toBe(orderId);
  });

  it('should return the correct values for an order created', async () => {
    const { placeOrder, createUser, createItem } = makeSUT();
    const guitarra = {
      description: 'Guitarra',
      height: 50,
      width: 100,
      length: 15,
      weight: 3,
      price: 1000,
    };
    await createItem.execute(guitarra);
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });
    const {
      discount,
      freight,
      items,
      order_id,
      total,
      user: { cpf, name },
      zipCodeDestination,
    } = await placeOrder.execute({
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
      freight: {
        zipCodeDestination: 'any_destination',
        zipCodeOrigin: 'any_origin',
      },
    });
    const orderId = `${new Date().getFullYear()}00000001`;
    expect(order_id).toBe(orderId);
    expect(discount).toBe(0);
    expect(freight).toBe(60);
    expect(items).toEqual([
      { description: 'Guitarra', price: 1000, quantity: 2 },
    ]);
    expect(total).toBe(2060);
    expect(cpf).toBe('any_cpf');
    expect(name).toBe('any_name');
    expect(zipCodeDestination).toBe('any_destination');
  });
});
