import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Resolver('Product')
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return await this.productsService.create(createProductInput);
  }

  @Query(() => [Product])
  products() {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  async update(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return await this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Boolean)
  async remove(@Args('id') id: number) {
    return await this.productsService.remove(id);
  }
}
