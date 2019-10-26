import { Module } from '@nestjs/common';
import { AuthService } from './auth-service/AuthService';
import { UsersModule } from '../users/UsersModule';
import { AuthController } from './AuthController';
import { LocalStrategy } from './local-strategy/LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt-strategy/JWTStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import passwordResetSchema from './schemas/passwordResetSchema';

@Module( {
    providers:   [ AuthService, LocalStrategy, JWTStrategy ],
    imports:     [
        UsersModule,
        PassportModule,
        MongooseModule.forFeature( [
            {
                name:   'PasswordReset',
                schema: passwordResetSchema,
            },
        ] ),
    ],
    controllers: [ AuthController ],
} )
export class AuthModule
{
}
