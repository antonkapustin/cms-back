import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private _authService: AuthService) {
        super()
    }

    async validate(username: string, password: string): Promise<unknown> {
        const user:unknown = await this._authService.validateUser(username, password);
        // console.log(user)
        if(!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}