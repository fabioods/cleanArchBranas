import { Item } from '../../../domain/entity/Item';
import { ItemRepositoryMemory } from '../../../infra/repository/memory/ItemRepositoryMemory';
import { CreateItem } from './CreateItem';

interface MakeSUT {
  createItem: CreateItem;
}

const makeSUT = (): MakeSUT => {
  const itemRepository = new ItemRepositoryMemory();
  const createItem = new CreateItem(itemRepository);
  return { createItem };
};

describe('Create item', () => {
  it('should be able to create a new Item', async () => {
    const { createItem } = makeSUT();
    const itemDTO = {
      description: 'any_description',
      height: 10,
      width: 10,
      length: 10,
      weight: 10,
      price: 1000,
    };
    const item = new Item(
      itemDTO.description,
      itemDTO.height,
      itemDTO.width,
      itemDTO.length,
      itemDTO.weight,
      itemDTO.price
    );
    const newItem = await createItem.execute(item);
    expect(newItem.id).toBe('1');
  });
});
