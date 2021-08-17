import { ZipCodeCalculatorAPI } from '../../../domain/gateway/ZipCodeCalculatorAPI';

export class ZipcodeCalculatorAPIMemory implements ZipCodeCalculatorAPI {
  calculate(zipCodeA: string, zipCodeB: string): number {
    return 1000;
  }
}