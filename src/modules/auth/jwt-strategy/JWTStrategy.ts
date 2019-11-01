import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config-service/ConfigService';
import JWTPayload from '../types/JWTPayload';
import { UsersService } from '../../users/users-service/UsersService';

@Injectable()
export class JWTStrategy extends PassportStrategy( Strategy, 'jwt' )
{
    public constructor( protected readonly configService: ConfigService, protected readonly usersService: UsersService )
    {
        super( {
            jwtFromRequest:   ExtractJwt.fromExtractors( [
                req => req.cookies.jwt ? req.cookies.jwt : null,
            ] ),
            ignoreExpiration: false,
            secretOrKey:      configService.get( 'JWT_SECRET' ),
        } );
    }

    public async validate( { sub }: JWTPayload )
    {
        return this.usersService.findById( sub );
    }
}
