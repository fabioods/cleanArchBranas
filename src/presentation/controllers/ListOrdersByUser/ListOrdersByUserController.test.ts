import { CreateOrderUseCase } from '../../../data/useCases/CreateOrderUseCase';
import { CreateUserUseCase } from '../../../data/useCases/CreateUserUseCase';
import { ListOrderByUserUseCase } from '../../../data/useCases/ListOrderByUserUseCase';
import { ICreateOrderDTO } from '../../../domain/useCases/ICreateOrder';
import { MemoryCouponRepository } from '../../../infra/repositories/implementation/MemoryCouponRepository';
import { MemoryOrderRepository } from '../../../infra/repositories/implementation/MemoryOrderRepository';
import { MemoryUserRepository } from '../../../infra/repositories/implementation/MemoryUserRepository';
import { CPFValidatorAdapter } from '../../../utils/cpfValidatorAdapter';
import { CreateOrderController } from '../createOrder/CreateOrderController';
import { CreateUserController } from '../createUser/CreateUserController';
import { ListOrderByUserController } from './ListOrdersByUserController';

describe('List orders by user', () => {
  const makeSUT = () => {
    const userRepository = new MemoryUserRepository();
    const cpfValidatorAdapter = new CPFValidatorAdapter();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createUserController = new CreateUserController(
      cpfValidatorAdapter,
      createUserUseCase
    );

    const couponRepository = new MemoryCouponRepository();

    const orderRepository = new MemoryOrderRepository();
    const createOrderUserCase = new CreateOrderUseCase(
      orderRepository,
      couponRepository,
      userRepository
    );
    const createOrderController = new CreateOrderController(
      createOrderUserCase
    );

    const listOrdersByUserUseCase = new ListOrderByUserUseCase(orderRepository);
    const listOrdersByUserController = new ListOrderByUserController(
      listOrdersByUserUseCase
    );

    return {
      createOrderController,
      listOrdersByUserController,
      createUserController,
    };
  };

  it('should be able to return the number of orders by user', async () => {
    const {
      createOrderController,
      listOrdersByUserController,
      createUserController,
    } = makeSUT();

    const createUser = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });

    const order = {
      user_id: createUser.body.user.id,
      coupon: 'x',
      items: [
        {
          description: 'Coca-cola',
          quantity: 1,
          price: 10,
        },
      ],
    } as ICreateOrderDTO;

    await createOrderController.handle({
      body: {
        order,
      },
    });
    await createOrderController.handle({
      body: {
        order,
      },
    });
    const httpResponse = await listOrdersByUserController.handle({
      body: { user_id: createUser.body.user.id },
    });

    expect(httpResponse.body.length).toBe(2);
  });
});
