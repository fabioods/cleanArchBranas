import { Item } from '../../../domain/entity/Item';
import { ItemRepository } from '../../../domain/repository/ItemRepository';

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  async getById(id: string): Promise<Item | undefined> {
    return this.items.find(item => item.id === id);
  }

  async save(item: Item): Promise<Item> {
    this.items.push(Object.assign(item, { id: `${this.items.length + 1}` }));
    return item;
  }
}
