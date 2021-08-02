import { Coupon } from './Coupon';
import { Order } from './Order';

describe('Order test', () => {
  it('Não deve criar um pedido com CPF inválido', () => {
    const invalid_cpf = '111.111.111-00';

    expect(() => new Order(invalid_cpf)).toThrow(new Error('Invalid CPF'));
  });

  it('Deve criar um pedido com 3 itens', () => {
    const valid_cpf = '778.278.412-36';
    const order = new Order(valid_cpf);
    order.addItem('Guitarra', 1000, 2);
    order.addItem('Amplificador', 5000, 1);
    order.addItem('Cabo', 30, 3);
    const total = order.getTotal();
    expect(total).toBe(7090);
  });

  it('Deve criar um pedido com cupom de desconto', () => {
    const valid_cpf = '778.278.412-36';
    const order = new Order(valid_cpf);
    order.addItem('Guitarra', 1000, 2);
    order.addItem('Amplificador', 5000, 1);
    order.addItem('Cabo', 30, 3);
    order.addCoupon(new Coupon('VALE20', 20));
    const total = order.getTotal();
    expect(total).toBe(5672);
  });
});
