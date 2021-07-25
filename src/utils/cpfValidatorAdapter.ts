import { CPFValidator } from '../protocols/CPFValidator';

export class CPFValidatorAdapter implements CPFValidator {
  private readonly FACTOR_DIGIT_1 = 10;

  private readonly FACTOR_DIGIT_2 = 11;

  private readonly MAX_DIGITS_1 = 9;

  private readonly MAX_DIGITS_2 = 10;

  private extractDigits(cpf: string): string {
    // Remove all non numeric characters
    return cpf.replace(/\D/g, '');
  }

  private invalidLength(cpf: string): boolean {
    return cpf.length !== 11;
  }

  private allTheSame(cpf: string): boolean {
    return cpf.split('').every(c => c === cpf[0]);
  }

  private toDigitArray(cpf: string): number[] {
    return [...cpf].map(digit => Number(digit));
  }

  private calculateDigit(cpf: string, factor: number, max: number): number {
    const digits = this.toDigitArray(cpf).slice(0, max);
    let subFactor = 0;
    const total = digits.reduce((prev, curr) => {
      const calc = prev + curr * (factor - subFactor);
      subFactor += 1;
      return calc;
    }, 0);

    return total % 11 < 2 ? 0 : 11 - (total % 11);
  }

  private getCheckDigit(cpf: string): string {
    return cpf.slice(9);
  }

  validate(cpf: string): boolean {
    if (!cpf) return false;
    const cpfOnlyNumbers = this.extractDigits(cpf);
    if (this.invalidLength(cpfOnlyNumbers)) return false;
    if (this.allTheSame(cpfOnlyNumbers)) return false;
    const digit1 = this.calculateDigit(
      cpfOnlyNumbers,
      this.FACTOR_DIGIT_1,
      this.MAX_DIGITS_1
    );
    const digit2 = this.calculateDigit(
      cpfOnlyNumbers,
      this.FACTOR_DIGIT_2,
      this.MAX_DIGITS_2
    );
    const calculatedCheckDigit = `${digit1}${digit2}`;
    return this.getCheckDigit(cpfOnlyNumbers) === calculatedCheckDigit;
  }
}
