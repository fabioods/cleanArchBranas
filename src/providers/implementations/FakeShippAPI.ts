import { IShipp } from '../IShipp';

export class FakeShippApi implements IShipp {
  async calculateDistance(
    source: string,
    destination: string
  ): Promise<number> {
    return 1000;
  }
}
