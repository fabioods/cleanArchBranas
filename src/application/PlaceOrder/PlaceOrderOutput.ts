export class PlaceOrderOutput {
  freight: number;

  total: number;

  code: string;

  constructor({
    freight,
    total,
    code,
  }: {
    freight: number;
    total: number;
    code: string;
  }) {
    this.freight = freight;
    this.total = total;
    this.code = code;
  }
}
