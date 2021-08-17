import pgp from 'pg-promise';
import Database from './Database';

export default class PgPromiseDatabase implements Database {
  pgp: any;

  constructor() {
    this.pgp = pgp()('postgres://postgres:postgres@localhost:5555/cleanArch');
  }

  async many(query: string, parameters: any): Promise<any> {
    return this.pgp.query(query, parameters);
  }

  async one(query: string, parameters: any): Promise<any> {
    return this.pgp.oneOrNone(query, parameters);
  }
}
