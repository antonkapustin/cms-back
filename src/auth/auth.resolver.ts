import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user-input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth-guard';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private _authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    const payload = await this._authService.login(context.user);
    context.res.cookie('jwt', payload.access_token, { httpOnly: true });
    return payload;
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this._authService.signup(loginUserInput);
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx) {
    ctx.res.clearCookie('jwt', { path: '/graphql' });
    return true;
  }
}
