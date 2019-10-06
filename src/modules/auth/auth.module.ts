import { Module } from '@nestjs/common';
import { AuthService } from './auth-service/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy/jwt.strategy';

@Module( {
    providers:   [ AuthService, LocalStrategy, JwtStrategy ],
    imports:     [
        UsersModule,
        PassportModule,
    ],
    controllers: [ AuthController ],
} )
export class AuthModule
{
}
