import { Injectable } from '@nestjs/common';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    private readonly _prismaService: PrismaService
  ) {}
  async create(createStoreInput: CreateStoreInput): Promise<Store> {
    const res = await this._prismaService.store.create({ data: createStoreInput });
    return res;
  }

  async findAll(): Promise<Store[]> {
    return await this._prismaService.store.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreInput: UpdateStoreInput) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
