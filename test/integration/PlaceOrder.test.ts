import { PlaceOrder } from '../../src/application/PlaceOrder/PlaceOrder';
import { ZipcodeCalculatorAPIMemory } from '../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory';
import { PlaceOrderInput } from '../../src/application/PlaceOrder/PlaceOrderInput';
import { MemoryRepositoryFactory } from '../../src/infra/factory/MemoryRepositoryFactory';
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';

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
    const repositoryFactory = new MemoryRepositoryFactory();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
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
    const repositoryFactory = new DatabaseRepositoryFactory();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
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
    const repositoryFactory = new MemoryRepositoryFactory();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
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
    const repositoryFactory = new MemoryRepositoryFactory();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
    const output = await placeOrder.execute(input);
    expect(output.freight).toBe(310);
  });

  it('Deve fazer um pedido calculando o código', async () => {
    const valid_cpf = '778.278.412-36';
    const repositoryFactory = new MemoryRepositoryFactory();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
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
