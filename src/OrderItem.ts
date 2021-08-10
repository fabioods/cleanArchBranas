export class OrderItem {
  id: string;

  quantity: number;

  price: number;

  constructor(id: string, quantity: number, price: number) {
    this.id = id;
    this.quantity = quantity;
    this.price = price;
  }

  getTotal(): number {
    return this.quantity * this.price;
  }
}
