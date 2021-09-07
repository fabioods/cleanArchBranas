export class OrderCode {
  value: string;

  constructor(issueDate: Date, sequence: number) {
    this.value = `${issueDate.getFullYear()}${sequence
      .toString()
      .padStart(8, '0')}`;
  }
}
