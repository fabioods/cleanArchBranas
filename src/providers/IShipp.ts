export interface IShipp {
  calculateDistance(source: string, destination: string): Promise<number>;
}
