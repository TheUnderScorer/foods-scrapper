import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users-service/UsersService';
import User from '../../users/types/User';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../../config/config-service/ConfigService';
import { Response } from 'express';

@Injectable()
export class AuthService
{

    public static readonly cookieKey: string = 'jwt';

    public constructor(
        protected readonly usersService: UsersService,
        protected readonly configService: ConfigService,
    )
    {
    }

    public async validateUser( email: string, password: string ): Promise<User | null>
    {
        const user = await this.usersService.findByEmail( email );

        const comparePassword = async () => await compare( password, user.password );

        if ( user && await comparePassword() ) {
            return user;
        }

        return null;
    }

    public async login( user: User, res: Response ): Promise<string>
    {
        const payload = { email: user.email, sub: user._id };

        const token = jwt.sign( payload, this.configService.get( 'JWT_SECRET' ) );
        res.cookie( AuthService.cookieKey, token );

        return token;
    }

    public logout( res: Response ): void
    {
        res.clearCookie( AuthService.cookieKey );
    }

}
