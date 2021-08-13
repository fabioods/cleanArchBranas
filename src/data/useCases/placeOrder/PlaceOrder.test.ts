import { ItemRepositoryMemory } from '../../../infra/repository/memory/ItemRepositoryMemory';
import { OrderRepositoryMemory } from '../../../infra/repository/memory/OrderRepositoryMemory';
import { UserRepositoryMemory } from '../../../infra/repository/memory/UserRepositoryMemory';
import { CPFValidator } from '../../../utils/cpfValidator/cpfValidator';
import { CreateItem } from '../createItem/CreateItem';
import { CreateUser } from '../createUser/CreateUser';
import { PlaceOrder } from './PlaceOrder';

interface MakeSUT {
  placeOrder: PlaceOrder;
  createUser: CreateUser;
  createItem: CreateItem;
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

  const orderRepository = new OrderRepositoryMemory();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    userRepository
  );
  return { placeOrder, createUser, createItem };
};

describe('Place a new Order', () => {
  it('should not create a new Order with no items', async () => {
    const { placeOrder, createUser } = makeSUT();
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });
    const order = {
      user_id: user.id,
      items: [],
    };
    const newOrder = placeOrder.execute(order);
    await expect(newOrder).rejects.toThrow();
  });

  it('should not create a new Order with no user defined', async () => {
    const { placeOrder } = makeSUT();
    const order = {
      user_id: null,
      items: [],
    };
    const newOrder = placeOrder.execute(order);
    await expect(newOrder).rejects.toThrow();
  });

  it('should not create a new Order with an item id who does not exists', async () => {
    const { placeOrder, createUser } = makeSUT();
    const user = await createUser.execute({ cpf: 'any_cpf', name: 'any_name' });
    const order = {
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
    };

    const newOrder = placeOrder.execute(order);
    await expect(newOrder).rejects.toThrow();
  });

  it('should not create a new Order with an user who does not exists', async () => {
    const { placeOrder } = makeSUT();
    const order = {
      user_id: '1',
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
    };
    const newOrder = placeOrder.execute(order);
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

    const order = {
      user_id: user.id,
      items: [
        {
          id: '1',
          quantity: 2,
        },
      ],
    };
    const newOrder = await placeOrder.execute(order);
    expect(newOrder.id).toBe('1');
  });
});
