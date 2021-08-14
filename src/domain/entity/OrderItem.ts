export class OrderItem {
  id: string;

  quantity: number;

  price: number;

  order_id: string;

  item_id: string;

  constructor(item_id: string, quantity: number, price: number) {
    this.item_id = item_id;
    this.quantity = quantity;
    this.price = price;
  }

  getTotal(): number {
    return this.quantity * this.price;
  }

  setOrderId(id: string): void {
    this.order_id = id;
  }
}
