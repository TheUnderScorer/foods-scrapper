import { Module } from '@nestjs/common';
import { AuthService } from './auth-service/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module( {
    providers:   [ AuthService, LocalStrategy ],
    imports:     [
        UsersModule,
        PassportModule,
    ],
    controllers: [ AuthController ],
} )
export class AuthModule
{
}
