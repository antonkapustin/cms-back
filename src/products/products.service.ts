import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Category, Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from 'src/category/category.service';

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
      image: input.image ?? undefined,
      categoryId: 0,
    };
    let category: Category | null = {} as Category;
    const {categoryName, ...newProduct}  = data;
    if (categoryName) {
      category = await this.categoryService.findOne(categoryName);
      if (!category) {
       category = await this.categoryService.create({ name: categoryName });
      }
    }

    newProduct.categoryId = category.categoryId;
    const product = await this.prisma.product.create({ data:newProduct });
    return product;
  }

  async findAll(): Promise<Product[]> {
    const all = this.prisma.product.findMany({});
    return all;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.prisma.product.delete({ where: { id } });
    return !!res;
  }
}
