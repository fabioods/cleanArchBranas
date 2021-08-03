import { CreateCouponUseCase } from '../../../data/useCases/CreateCouponUseCase';
import { CreateOrderUseCase } from '../../../data/useCases/CreateOrderUseCase';
import { CreateUserUseCase } from '../../../data/useCases/CreateUserUseCase';
import { ICreateOrderDTO } from '../../../domain/useCases/ICreateOrder';
import { MemoryCouponRepository } from '../../../infra/repositories/implementation/MemoryCouponRepository';
import { MemoryOrderRepository } from '../../../infra/repositories/implementation/MemoryOrderRepository';
import { MemoryUserRepository } from '../../../infra/repositories/implementation/MemoryUserRepository';
import { CPFValidatorAdapter } from '../../../utils/cpfValidatorAdapter';
import { DateFnsAdapter } from '../../../utils/dateFnsAdapter';
import { CreateCouponController } from '../createCoupon/CreateCouponController';
import { CreateUserController } from '../createUser/CreateUserController';
import { CreateOrderController } from './CreateOrderController';

describe('Criação de pedidos', () => {
  const makeSUT = () => {
    const userRepository = new MemoryUserRepository();
    const cpfValidatorAdapter = new CPFValidatorAdapter();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createUserController = new CreateUserController(
      cpfValidatorAdapter,
      createUserUseCase
    );

    const couponRepository = new MemoryCouponRepository();
    const dateFnsAdapter = new DateFnsAdapter();
    const createCouponUseCase = new CreateCouponUseCase(
      couponRepository,
      dateFnsAdapter
    );
    const createCouponController = new CreateCouponController(
      createCouponUseCase
    );

    const orderRepository = new MemoryOrderRepository();
    const createOrderUserCase = new CreateOrderUseCase(
      orderRepository,
      couponRepository,
      userRepository
    );
    const createOrderController = new CreateOrderController(
      createOrderUserCase
    );
    return {
      createOrderController,
      createUserController,
      createCouponController,
      dateFnsAdapter,
    };
  };

  it('should be able to return a message if no item was provided', async () => {
    const { createOrderController, createUserController } = makeSUT();
    const createUser = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });

    const order = {
      user_id: createUser.body.user.id,
      coupon: '',
      items: [],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.body).toBe('Order must have at least one item');
  });

  it('should be able to return a message if no user_id was not provided', async () => {
    const { createOrderController } = makeSUT();

    const order = {
      user_id: '',
      coupon: '',
      items: [],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.body).toBe('Missing user_id');
  });

  it('should be able to return a message if user was not found', async () => {
    const { createOrderController } = makeSUT();

    const order = {
      user_id: 'XXX',
      coupon: '',
      items: [],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.body).toBe('User not found');
  });

  it('should be able to return 10 if order was created', async () => {
    const { createOrderController, createUserController } = makeSUT();
    const createUser = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });
    const order = {
      user_id: createUser.body.user.id,
      coupon: '',
      items: [
        {
          description: 'Coca-cola',
          quantity: 1,
          price: 10,
        },
      ],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.body.getTotal()).toBe(10);
  });

  it('should be able to return error if total with discount was incorrect', async () => {
    const {
      createOrderController,
      createUserController,
      createCouponController,
    } = makeSUT();

    const coupon = {
      description: 'VALE20',
      expiresIn: new Date(2099, 1, 1),
      percentage: 10,
    };

    await createCouponController.handle({
      body: { coupon },
    });

    const createUser = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });
    const order = {
      user_id: createUser.body.user.id,
      coupon: 'VALE20',
      items: [
        {
          description: 'Coca-cola',
          quantity: 1,
          price: 10,
        },
      ],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.body.getTotal()).not.toEqual(10);
  });

  it('should be able to return the correct discount for order', async () => {
    const {
      createOrderController,
      createUserController,
      createCouponController,
    } = makeSUT();

    const coupon = {
      description: 'VALE20',
      expiresIn: new Date(2099, 1, 1),
      percentage: 10,
    };

    await createCouponController.handle({
      body: { coupon },
    });

    const createUser = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });
    const order = {
      user_id: createUser.body.user.id,
      coupon: 'VALE20',
      items: [
        {
          description: 'Coca-cola',
          quantity: 1,
          price: 10,
        },
      ],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.body.getTotal()).toEqual(9);
  });

  it('should be able to return a message if invalid coupon was provided', async () => {
    const {
      createOrderController,
      createUserController,
      createCouponController,
    } = makeSUT();
    jest.spyOn(Date.prototype, 'getTime').mockImplementation(() => 1);

    const coupon = {
      description: 'VALE21',
      expiresIn: new Date(2099, 1, 1),
      percentage: 10,
    };

    await createCouponController.handle({
      body: { coupon },
    });

    const createUser = await createUserController.handle({
      body: { name: 'Fábio', cpf: '529.982.247-25' },
    });
    const order = {
      user_id: createUser.body.user.id,
      coupon: 'VALE21',
      items: [
        {
          description: 'Coca-cola',
          quantity: 1,
          price: 10,
        },
      ],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.body).toEqual('Invalid coupon');
  });
});
