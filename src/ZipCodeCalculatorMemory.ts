import { ZipCodeCalculatorAPI } from './ZipCodeCalculatorAPI';

export class ZipCodeCalculatorMemory implements ZipCodeCalculatorAPI {
  calculate(zipCodeA: string, zipCodeB: string): number {
    return 1000;
  }
}
