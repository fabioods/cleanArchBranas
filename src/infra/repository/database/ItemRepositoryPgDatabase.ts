import { Item } from '../../../domain/entity/Item';
import { ItemRepository } from '../../../domain/repository/ItemRepository';
import { Database } from '../../database/Database';

export class ItemRepositoryPgDatabase implements ItemRepository {
  constructor(private database: Database) {}

  async save(item: Item): Promise<Item> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<Item | undefined> {
    const itemData = await this.database.one(
      'select * from cleanarch.item where id = $1',
      [id]
    );
    const item = new Item(
      itemData.description,
      itemData.height,
      itemData.width,
      itemData.length,
      itemData.weight,
      itemData.price
    );

    return item;
  }
}
