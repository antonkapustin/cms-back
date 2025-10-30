import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryInput: CreateCategoryInput) {
    const category = this.prisma.category.create({ data: createCategoryInput });
    return category;
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(name: string) {
    return this.prisma.category.findUnique({ where: { name } });
  }

  async findOneById(categoryId: number) {
    return this.prisma.category.findUnique({ where: { categoryId },
    include: { products: true } });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  async remove(categoryId: number): Promise<boolean> {
    const res = await this.prisma.category.delete({ where: { categoryId } });
    return true;
  }
}
