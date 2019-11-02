import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from '../../users/types/User';
import { AuthService } from '../auth-service/AuthService';

@Injectable()
export class LocalStrategy extends PassportStrategy( Strategy, 'local' )
{
    public constructor(
        protected readonly authService: AuthService,
    )
    {
        super( {
            usernameField: 'email',
        } );
    }

    public async validate( email: string, password: string ): Promise<User>
    {
        const user = await this.authService.validateUser( email, password );

        if ( user ) {
            return user;
        }

        throw new UnauthorizedException( 'Invalid email or password provided.' );
    }

}
