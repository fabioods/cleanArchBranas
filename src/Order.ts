import { CPF } from './CPF';
import { OrderItem } from './OrderItem';

export class Order {
  cpf: CPF;

  items: OrderItem[];

  constructor(cpf: string) {
    this.cpf = new CPF(cpf);
    this.items = [];
  }

  addItem(description: string, price: number, quantity: number): void {
    this.items.push(new OrderItem(description, price, quantity));
  }

  getTotal(): number {
    return this.items.reduce((cur, next) => {
      return cur + next.price * next.quantity;
    }, 0);
  }
}
