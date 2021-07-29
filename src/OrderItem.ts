export class OrderItem {
  description: string;

  quantity: number;

  price: number;

  constructor(description: string, quantity: number, price: number) {
    this.description = description;
    this.quantity = quantity;
    this.price = price;
  }
}
