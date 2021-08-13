import { CPFValidator } from './cpfValidator';
import { CPFValidatorAdapter } from './cpfValidatorAdapter';

describe('CPF validator', () => {
  it('should be able to return false if CPF values are the same', () => {
    const cpf = '000.000.000-00';
    const cpfValidator: CPFValidator = new CPFValidatorAdapter();
    expect(cpfValidator.validate(cpf)).toBe(false);
  });

  it('should be able to return false if cpf is not valid', () => {
    const cpf = '123.456.789-10';
    const cpfValidator: CPFValidator = new CPFValidatorAdapter();
    expect(cpfValidator.validate(cpf)).toBe(false);
  });

  it('should be able to return false if cpf is not provided', () => {
    const cpf = '';
    const cpfValidator: CPFValidator = new CPFValidatorAdapter();
    expect(cpfValidator.validate(cpf)).toBe(false);
  });

  it('should be able to return false if cpf length is not valid', () => {
    const cpf = '123';
    const cpfValidator: CPFValidator = new CPFValidatorAdapter();
    expect(cpfValidator.validate(cpf)).toBe(false);
  });

  it('should be able to return true if cpf is valid', () => {
    const cpf = '529.982.247-25';
    const cpfValidator: CPFValidator = new CPFValidatorAdapter();
    expect(cpfValidator.validate(cpf)).toBe(true);
  });
});
