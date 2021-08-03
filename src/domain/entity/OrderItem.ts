export class OrderItem {
  id: string;

  description: string;

  quantity: number;

  price: number;

  order_id: string;

  height: number;

  width: number;

  thickness: number;

  weight: number;

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

  getVolume(): number {
    return this.height * this.width * this.thickness;
  }

  getDensity(): number {
    return this.weight / this.getVolume();
  }

  getTotal(): number {
    return this.quantity * this.price;
  }
}
