import { CreateOrderUseCase } from '../../../data/useCases/CreateOrderUseCase';
import { ICreateOrderDTO } from '../../../domain/useCases/ICreateOrder';
import { MemoryOrderRepository } from '../../../infra/repositories/implementation/MemoryOrderRepository';
import { IController } from '../../protocols';
import { CreateOrderController } from './CreateOrderController';

describe('Criação de pedidos', () => {
  const makeSUT = (): IController => {
    const orderRepository = new MemoryOrderRepository();
    const createOrderUserCase = new CreateOrderUseCase(orderRepository);
    const createOrderController = new CreateOrderController(
      createOrderUserCase
    );
    return createOrderController;
  };

  it('should be able to return status 400 if no item in order was found', async () => {
    const createOrderController = makeSUT();
    const order = {
      user_id: 'XXX',
      discount: 0,
      total: 0,
      items: [],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.status).toBe(400);
  });

  it('should be able to return status 400 if no user_id was found', async () => {
    const createOrderController = makeSUT();
    const order = {
      user_id: '',
      discount: 0,
      total: 0,
      items: [],
    } as ICreateOrderDTO;
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.status).toBe(400);
  });

  it('should be able to return status 200 if order was created', async () => {
    const createOrderController = makeSUT();
    const order = {
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
    const httpResponse = await createOrderController.handle({
      body: {
        order,
      },
    });
    expect(httpResponse.status).toBe(200);
  });

  it('should be able to return error if total with discount was incorrect', async () => {
    const createOrderController = makeSUT();
    const order = {
      user_id: 'XXXX',
      discount: 1,
      total: 10,
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
    expect(httpResponse.body.total_with_discount).not.toEqual(9);
  });

  it('should be able to return the correct discount for order', async () => {
    const createOrderController = makeSUT();
    const order = {
      user_id: 'XXXX',
      discount: 10,
      total: 10,
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
    expect(httpResponse.body.total_with_discount).toEqual(9);
  });
});
