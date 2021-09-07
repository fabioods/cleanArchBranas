import { Coupon } from '../../../domain/entity/Coupon';
import { Order } from '../../../domain/entity/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';
import Database from '../../database/Database';

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private database: Database) {}

  async save(order: Order): Promise<void> {
    const orderData = await this.database.one(
      'INSERT INTO ccca.order (code, cpf, issue_date, freight, serial, coupon_code) values($1,$2,$3,$4,$5,$6) returning *',
      [
        order.code.value,
        order.cpf.value,
        order.issueDate,
        order.freight,
        order.sequence,
        order.coupon?.code,
      ]
    );

    order.items.forEach(async orderItem => {
      await this.database.one(
        'insert into ccca.order_item (id_order, id_item, price, quantity) values ($1,$2,$3,$4)',
        [orderData.id, orderItem.id, orderItem.price, orderItem.quantity]
      );
    });
  }

  async count(): Promise<number> {
    const { count } = await this.database.one(
      'select count(*)::int as count from ccca.order ',
      []
    );
    return count;
  }

  async getOrder(code: string): Promise<Order> {
    const orderData = await this.database.one(
      'select * from ccca.order where code = $1',
      [code]
    );
    const order = new Order(
      orderData.cpf,
      new Date(orderData.issue_date),
      orderData.serial
    );
    const orderItensData = await this.database.many(
      'SELECT * FROM ccca.order_item where id_order = $1',
      [orderData.id]
    );

    orderItensData.forEach(
      (orderItemData: { id_item: string; quantity: number; price: number }) => {
        order.addItem(
          orderItemData.id_item,
          Number(orderItemData.price),
          orderItemData.quantity
        );
      }
    );

    if (orderData.coupon_code) {
      const couponData = await this.database.one(
        'select * from ccca.coupon where code = $1',
        [orderData.coupon_code]
      );

      if (couponData)
        order.addCoupon(
          new Coupon(
            couponData.code,
            couponData.percentage,
            couponData.expire_date
          )
        );
    }
    order.freight = Number(orderData.freight);
    return order;
  }

  async clean(): Promise<void> {
    await this.database.none('delete from ccca.order_item', []);
    await this.database.none('delete from ccca.order', []);
  }
}
