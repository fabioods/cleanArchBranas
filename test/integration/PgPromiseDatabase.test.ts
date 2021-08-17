import PgPromiseDatabase from '../../src/infra/database/PgPromiseDatabase';

let db: any;

describe('Pg Promise connect', () => {
  beforeAll(() => {
    db = new PgPromiseDatabase();
  });

  it('Deve conectar no banco de dados e listar os 3 itens existentes', async () => {
    const items = await db.many('SELECT * FROM cleanarch.item', []);
    expect(items).toHaveLength(3);
  });

  it('Deve conectar no banco de dados e listar um item existente', async () => {
    const item = await db.one(
      'SELECT * FROM cleanarch.item where description = $1',
      ['Guitarra']
    );
    expect(item.description).toBe('Guitarra');
  });
});
