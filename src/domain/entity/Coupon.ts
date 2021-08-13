export class Coupon {
  id: string;

  description: string;

  percentage: number;

  expiresIn: Date;

  constructor(description: string, percentage: number, expiresIn: Date) {
    this.description = description;
    this.percentage = percentage;
    this.expiresIn = expiresIn;
  }

  isValid(): boolean {
    return this.expiresIn && this.expiresIn.getTime() < Date.now();
  }
}
