import { PlaceOrder } from './PlaceOrder';
import { PlaceOrderInput } from './PlaceOrderInput';

describe('Realizar pedido', () => {
  it('Deve fazer um pedido', () => {
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
    };

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5982);
  });

  it('Deve fazer um pedido com cupom de desconto expirado', () => {
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
    });

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7400);
  });

  it('Deve fazer um pedido com calculo de frete', () => {
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
    };

    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.freight).toBe(310);
  });
});
