import { Item } from './Item';

export default interface ItemRepository {
  getById(id: string): Promise<Item | undefined>;
}
