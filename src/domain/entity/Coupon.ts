export class Coupon {
  code: string;

  percentage: number;

  expireDate: Date;

  constructor(code: string, percentage: number, expireDate: Date) {
    this.code = code;
    this.percentage = percentage;
    this.expireDate = expireDate;
  }

  isExpired(): boolean {
    const today = new Date();
    return this.expireDate.getTime() < today.getTime();
  }
}
