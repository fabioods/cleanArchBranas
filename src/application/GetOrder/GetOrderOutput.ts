/* eslint-disable max-classes-per-file */
export class GetOrderItemsOutput {
  itemDescription: string | undefined;

  price: number;

  quantity: number;

  constructor({
    itemDescription,
    price,
    quantity,
  }: {
    itemDescription: string | undefined;
    price: number;
    quantity: number;
  }) {
    this.itemDescription = itemDescription;
    this.price = price;
    this.quantity = quantity;
  }
}

export class GetOrderOutput {
  code: string;

  freight: number;

  total: number;

  orderItems: GetOrderItemsOutput[];

  constructor({
    code,
    freight,
    orderItems,
    total,
  }: {
    code: string;
    freight: number;
    orderItems: GetOrderItemsOutput[];
    total: number;
  }) {
    this.code = code;
    this.freight = freight;
    this.orderItems = orderItems;
    this.total = total;
  }
}
