import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(loginDTO: LoginDTO): Promise<any> {
        const user = await this.authService.login(loginDTO);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
