import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from '../../users/interfaces/user.interface';
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy( Strategy )
{
    public constructor(
        protected readonly authService: AuthService,
    )
    {
        super();
    }

    public async validate( email: string, password: string ): Promise<User>
    {
        const user = await this.authService.validateUser( email, password );

        if ( user ) {
            return user;
        }

        throw new UnauthorizedException();
    }

}
