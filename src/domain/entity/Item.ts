export class Item {
  id: string;

  description: string;

  price: number;

  weight: number;

  width: number;

  height: number;

  length: number;

  constructor(
    id: string,
    description: string,
    price: number,
    width: number,
    height: number,
    length: number,
    weight: number
  ) {
    this.id = id;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.height = height;
    this.length = length;
    this.width = width;
  }

  getVolume(): number {
    return (this.height / 100) * (this.length / 100) * (this.width / 100);
  }

  getDensity(): number {
    return this.weight / this.getVolume();
  }
}
