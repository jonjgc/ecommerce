import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private async getOrCreateCart(userId: string): Promise<Cart> {
    let userCart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!userCart) {
      const user = { id: userId } as User;
      userCart = this.cartRepository.create({ user, items: [] });
      await this.cartRepository.save(userCart);
    }
    return userCart;
  }

  async addItemToCart(userId: string, itemDto: AddItemDto): Promise<Cart> {
    const { productId, quantity } = itemDto;
    const cart = await this.getOrCreateCart(userId);

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const existingItem = cart.items.find(
      (item) => item.product.id === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      const newItem = this.cartItemRepository.create({
        product,
        quantity,
        cart,
      });
      await this.cartItemRepository.save(newItem);
      return this.cartRepository.findOneByOrFail({ id: cart.id });
    }
    return cart;
  }

  async removeItemFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    const itemToRemove = cart.items.find(
      (item) => item.product.id === productId,
    );

    if (!itemToRemove) {
      throw new NotFoundException('Item não encontrado no carrinho.');
    }

    await this.cartItemRepository.remove(itemToRemove);
    return this.getOrCreateCart(userId);
  }

  async findUserCart(userId: string): Promise<Cart> {
    return this.getOrCreateCart(userId);
  }
}
