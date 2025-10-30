import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}
  async create(input: CreateProductInput) {
    const data = {
      ...input,
      code: input.code ?? `code-${Date.now()}`,
      description: input.description ?? undefined,
      image:
        input.image ??
        'https://www.mobileana.com/wp-content/uploads/2025/06/Apple-iPhone-17-Pro-Max-Cosmic-Orange.webp',
      categoryId: 0,
    };
    let category: Category | null = {} as Category;
    const { categoryName, ...newProduct } = data;
    if (categoryName) {
      category = await this._findCategory(categoryName);
    }

    if(category) newProduct.categoryId = category.categoryId;
    const product = await this.prisma.product.create({ data: newProduct });
    return product;
  }

  async findAll(): Promise<Product[]> {
    const all = await this.prisma.product.findMany({
      include: { category: true },
    });
    return [] as Product[];
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    let category: Category | null = {} as Category;
    const { categoryName, ...data } = updateProductInput;
    if (categoryName) {
      category = await this._findCategory(categoryName);
    }

    const res = await this.prisma.product.update({
      where: { id },
      data: { categoryId: category?.categoryId, ...data },
    });
    return {} as Product;
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.prisma.product.delete({ where: { id } });
    return !!res;
  }

  private async _findCategory(categoryName: string): Promise<Category | null> {
    let category: Category | null = {} as Category;
    category = await this.categoryService.findOne(categoryName);
    if (!category) {
      category = await this.categoryService.create({ name: categoryName });
    }

    return category;
  }
}
