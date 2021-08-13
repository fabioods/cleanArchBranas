import { Item } from '../entity/Item';

export interface ItemRepository {
  save(item: Item): Promise<Item>;
  getById(id: string): Promise<Item | undefined>;
}
