import pgp from 'pg-promise';
import Database from './Database';

export default class PgPromiseDatabase implements Database {
  private pgp: any;

  static instance: PgPromiseDatabase;

  private constructor() {
    this.pgp = pgp()('postgres://postgres:postgres@localhost:5555/cleanArch');
  }

  static getInstance(): PgPromiseDatabase {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async many(query: string, parameters: any): Promise<any> {
    return this.pgp.query(query, parameters);
  }

  async one(query: string, parameters: any): Promise<any> {
    return this.pgp.oneOrNone(query, parameters);
  }

  async none(query: string, parameters: any): Promise<void> {
    return this.pgp.oneOrNone(query, parameters);
  }
}
