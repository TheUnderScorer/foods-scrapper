import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config-service/config.service';
import JwtPayload from '../interfaces/jwt-payload';
import { UsersService } from '../../users/users-service/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt' )
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

    public async validate( { sub }: JwtPayload )
    {
        return this.usersService.findById( sub );
    }
}
