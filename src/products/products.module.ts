import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
