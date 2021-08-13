import { User } from './User';

describe('Create a user object', () => {
  it('should be created', () => {
    const user = new User('any_name', 'any_cpf');
    expect(user).toBeTruthy();
  });
});
