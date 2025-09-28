import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as cacheManager from 'cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @Inject(CACHE_MANAGER) private cacheManager: cacheManager.Cache,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    const savedProduct = await this.productsRepository.save(newProduct);
    await this.clearProductsCache();
    return savedProduct;
  }

  async findAll() {
    const cacheKey = 'all_products';

    const cachedProducts = await this.cacheManager.get<Product[]>(cacheKey);
    if (cachedProducts) {
      return cachedProducts;
    }

    const products = await this.productsRepository.find();

    const plainProducts = JSON.parse(JSON.stringify(products)) as Product[];

    await this.cacheManager.set(cacheKey, plainProducts, 20000);

    return products;
  }
  private async clearProductsCache() {
    await this.cacheManager.del('all_products');
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }
    const updatedProduct = await this.productsRepository.save(product);
    await this.clearProductsCache();
    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    await this.clearProductsCache();
  }
}
