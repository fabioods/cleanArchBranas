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
    if (height < 0 || width < 0 || length < 0 || weight < 0 || price < 0)
      throw new Error('Invalid height, width, length, weight or price');

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
