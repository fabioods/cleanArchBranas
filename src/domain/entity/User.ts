export class User {
  id: string;

  name: string;

  cpf: string;

  constructor(name: string, cpf: string) {
    this.name = name;
    this.cpf = cpf;
  }
}
