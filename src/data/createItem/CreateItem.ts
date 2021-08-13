import { Item } from '../../domain/entity/Item';
import { ItemRepository } from '../../domain/repository/ItemRepository';

type ItemDTO = {
  description: string;
  height: number;
  width: number;
  length: number;
  weight: number;
  price: number;
};

export class CreateItem {
  constructor(private itemRepository: ItemRepository) {}

  async execute(itemDTO: ItemDTO): Promise<Item> {
    Object.entries(itemDTO).forEach(([key, value]) => {
      if (typeof value === 'number' && value < 0)
        throw new Error(`${key} must be positive`);
    });

    const item = new Item(
      itemDTO.description,
      itemDTO.height,
      itemDTO.width,
      itemDTO.length,
      itemDTO.weight,
      itemDTO.price
    );

    const newItem = await this.itemRepository.save(item);
    return newItem;
  }
}
