import { PlaceOrder } from './PlaceOrder';

describe('Realizar pedido', () => {
  it('Deve fazer um pedido', () => {
    const valid_cpf = '778.278.412-36';

    const input = {
      cpf: valid_cpf,
      items: [
        { description: 'Guitarra', quantity: 1000, price: 2 },
        { description: 'Amplificador', quantity: 5000, price: 1 },
        { description: 'Cabo', quantity: 30, price: 3 },
      ],
      coupon: 'VALE20',
    };

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
  });
});
