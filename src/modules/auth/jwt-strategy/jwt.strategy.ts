import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config-service/config.service';
import JwtPayload from '../interfaces/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt' )
{
    public constructor( protected readonly configService: ConfigService )
    {
        super( {
            jwtFromRequest:   ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:      configService.get( 'JWT_SECRET' ),
        } );
    }

    public async validate( { sub, email }: JwtPayload )
    {
        return {
            _id: sub,
            email,
        };
    }
}
