import { RepositoryFactory } from '../../domain/factory/RepositoryFactory';
import CouponRepository from '../../domain/repository/CouponRepository';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import CouponRepositoryMemory from '../repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../repository/memory/OrderRepositoryMemory';

export class MemoryRepositoryFactory implements RepositoryFactory {
  private itemInstance: ItemRepository;

  private couponInstance: CouponRepository;

  private orderInstance: OrderRepository;

  createItemRepository(): ItemRepository {
    if (!this.itemInstance) this.itemInstance = new ItemRepositoryMemory();
    return this.itemInstance;
  }

  createCouponRepository(): CouponRepository {
    if (!this.couponInstance)
      this.couponInstance = new CouponRepositoryMemory();
    return this.couponInstance;
  }

  createOrderRepository(): OrderRepository {
    if (!this.orderInstance) this.orderInstance = new OrderRepositoryMemory();
    return this.orderInstance;
  }
}
