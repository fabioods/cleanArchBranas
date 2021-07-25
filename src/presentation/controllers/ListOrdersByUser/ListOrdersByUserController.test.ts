import { CreateOrderUseCase } from '../../../data/useCases/CreateOrderUseCase';
import { ListOrderByUserUseCase } from '../../../data/useCases/ListOrderByUserUseCase';
import { ICreateOrderDTO } from '../../../domain/useCases/ICreateOrder';
import { MemoryOrderRepository } from '../../../infra/repositories/implementation/MemoryOrderRepository';
import { CreateOrderController } from '../createOrder/CreateOrderController';
import { ListOrderByUserController } from './ListOrdersByUserController';

describe('List orders by user', () => {
  const makeSUT = () => {
    const orderRepository = new MemoryOrderRepository();
    const createOrderUserCase = new CreateOrderUseCase(orderRepository);
    const listOrdersByUserUseCase = new ListOrderByUserUseCase(orderRepository);
    const createOrderController = new CreateOrderController(
      createOrderUserCase
    );
    const listOrdersByUserController = new ListOrderByUserController(
      listOrdersByUserUseCase
    );

    return { createOrderController, listOrdersByUserController };
  };

  it('should be able to return the number of orders by user', async () => {
    const { createOrderController, listOrdersByUserController } = makeSUT();
    const order1 = {
      user_id: 'XXXX',
      discount: 0,
      total: 10,
      items: [
        {
          description: 'Coca-cola',
          quantity: 1,
          price: 10,
        },
      ],
    } as ICreateOrderDTO;
    const order2 = {
      user_id: 'XXXX',
      discount: 0,
      total: 10,
      items: [
        {
          description: 'Coca-cola',
          quantity: 1,
          price: 10,
        },
      ],
    } as ICreateOrderDTO;
    const order3 = {
      user_id: 'YYYY',
      discount: 0,
      total: 10,
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
        order: order1,
      },
    });
    await createOrderController.handle({
      body: {
        order: order2,
      },
    });
    await createOrderController.handle({
      body: {
        order: order3,
      },
    });
    const httpResponse = await listOrdersByUserController.handle({
      body: { user_id: 'XXXX' },
    });
    expect(httpResponse.body.length).toBe(2);
  });
});
