export class OrderItem {
  id: string;

  description: string;

  quantity: number;

  price: number;

  order_id: string;

  getTotal(): number {
    return this.quantity * this.price;
  }

  constructor(
    description: string,
    quantity: number,
    price: number,
    order_id?: string,
    id?: string
  ) {
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    if (order_id) this.order_id = order_id;
    if (id) this.id = id;
  }
}
