export interface FreightCalculator {
  calculate(zipCodeOrigin: string, zipCodeDestination: string): Promise<number>;
}
