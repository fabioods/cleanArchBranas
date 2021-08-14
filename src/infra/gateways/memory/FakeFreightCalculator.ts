/* eslint-disable @typescript-eslint/no-unused-vars */
import { FreightCalculator } from '../../../providers/FreightCalculator';

export class FakeFreightCalculator implements FreightCalculator {
  async calculate(
    zipCodeOrigin: string,
    zipCodeDestination: string
  ): Promise<number> {
    return 1000;
  }
}
