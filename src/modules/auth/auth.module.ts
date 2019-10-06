import { Module } from '@nestjs/common';
import { AuthService } from './auth-service/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module( {
    providers:   [ AuthService, LocalStrategy ],
    imports:     [
        UsersModule,
        PassportModule,
        JwtModule.register( {
            secret:      'secret',
            signOptions: {
                expiresIn: '1d',
            },
        } ),
    ],
    controllers: [ AuthController ],
} )
export class AuthModule
{
}
