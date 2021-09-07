export class PlaceOrderOutput {
  freight: number;

  total: number;

  code: string;

  constructor({
    code,
    freight,
    total,
  }: {
    code: string;
    freight: number;
    total: number;
  }) {
    this.code = code;
    this.freight = freight;
    this.total = total;
  }
}
