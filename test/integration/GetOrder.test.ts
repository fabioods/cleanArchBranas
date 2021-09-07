import { PlaceOrder } from '../../src/application/PlaceOrder/PlaceOrder';
import { ZipcodeCalculatorAPIMemory } from '../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory';
import { GetOrder } from '../../src/application/GetOrder/GetOrder';
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';
import { MemoryRepositoryFactory } from '../../src/infra/factory/MemoryRepositoryFactory';

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
    const repositoryFactory = new MemoryRepositoryFactory();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
    const output = await placeOrder.execute(input);
    const getOrder = new GetOrder(repositoryFactory);
    const getOrderOut = await getOrder.execute(output.code);
    expect(getOrderOut.total).toBe(5982);
  });

  it('Deve consultar um pedido no banco', async () => {
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
    const repositoryFactory = new DatabaseRepositoryFactory();
    await repositoryFactory.createOrderRepository().clean();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();

    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
    const output = await placeOrder.execute(input);

    const getOrder = new GetOrder(repositoryFactory);
    const getOrderOut = await getOrder.execute(output.code);

    expect(getOrderOut.total).toBe(5982);
  });
});
