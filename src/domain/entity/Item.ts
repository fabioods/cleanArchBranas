export class Item {
  id: string;

  description: string;

  height: number;

  width: number;

  length: number;

  weight: number;

  price: number;

  constructor(
    description: string,
    height: number,
    width: number,
    length: number,
    weight: number,
    price: number
  ) {
    this.description = description;
    this.height = height;
    this.width = width;
    this.length = length;
    this.weight = weight;
    this.price = price;
  }

  getVolume(): number {
    return (this.height * this.width * this.length) / 1000000;
  }

  getDensity(): number {
    return this.weight / this.getVolume();
  }
}
