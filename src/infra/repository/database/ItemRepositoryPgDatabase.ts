import { Item } from '../../../domain/entity/Item';
import ItemRepository from '../../../domain/repository/ItemRepository';
import Database from '../../database/Database';

export class ItemRepositoryPGDatabase implements ItemRepository {
  constructor(private database: Database) {}

  async getById(id: string): Promise<Item | undefined> {
    const itemData = await this.database.one(
      'select * from cleanarch.item where id = $1',
      [id]
    );
    const item = new Item(
      itemData.id,
      itemData.description,
      itemData.price,
      itemData.width,
      itemData.height,
      itemData.length,
      itemData.weight
    );

    return item;
  }
}
