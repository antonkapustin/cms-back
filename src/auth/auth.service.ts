import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._userService.findOne(username);

    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this._jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const user = await this._userService.findOne(loginUserInput.username);

    if (user) {
      throw new Error('User already exists');
    }
    const password = await bcrypt.hash(loginUserInput.password, 10);
    return this._userService.create({ ...loginUserInput, password });
  }
}
