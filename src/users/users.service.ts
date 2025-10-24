import { ConflictException, Injectable } from '@nestjs/common';
import { LoginUserInput } from 'src/auth/dto/login-user-input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserInput: LoginUserInput) {
    await this.checkUser(createUserInput.username);
    const user = this.prisma.user.create({ data: createUserInput });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(username: string) {
    return this.prisma.user.findFirst({ where: { username } });
  }

  private async checkUser(username: string): Promise<void> {
    const existedUser = await this.prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
    });

    if (existedUser) {
      throw new ConflictException(`User ${username} already exists`);
    }
  }
}
