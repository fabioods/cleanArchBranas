export class Coupon {
  id: string;

  description: string;

  percentage: number;

  expiresIn: Date;

  constructor(
    id: string,
    description: string,
    percentage: number,
    expiresIn: Date
  ) {
    this.id = id;
    this.description = description;
    this.percentage = percentage;
    this.expiresIn = expiresIn;
  }

  isValid(): boolean {
    if (this.expiresIn && this.expiresIn.getTime() < Date.now()) return false;
    return true;
  }
}
