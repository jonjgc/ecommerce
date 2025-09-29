import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  async findAll(query: QueryProductDto) {
    const { page = 1, limit = 10, name } = query;

    console.log('--- BUSCANDO DADOS DO BANCO (PostgreSQL) ---');

    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<Product> = {};
    if (name) {
      where.name = ILike(`%${name}%`);
    }

    const [products, total] = await this.productsRepository.findAndCount({
      where,
      take: limit,
      skip: skip,
    });

    const totalPages = Math.ceil(total / limit);
    return {
      data: products,
      meta: {
        totalItems: total,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
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
    return this.productsRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}
