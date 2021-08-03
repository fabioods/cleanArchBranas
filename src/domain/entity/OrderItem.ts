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
    height?: number,
    width?: number,
    thickness?: number,
    weight?: number
  ) {
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    if (height) this.height = height;
    if (width) this.width = width;
    if (thickness) this.thickness = thickness;
    if (weight) this.weight = weight;
  }

  getVolume(): number {
    return (this.height * this.width * this.thickness) / 1000000;
  }

  getDensity(): number {
    return this.weight / this.getVolume();
  }

  getTotal(): number {
    return this.quantity * this.price;
  }
}
