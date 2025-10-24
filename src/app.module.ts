import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:4200',
        credentials: true,
      },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    PrismaModule,
    CategoryModule,
    // SalesModule,
  ],
})
export class AppModule {}
