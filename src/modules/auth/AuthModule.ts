import { Module } from '@nestjs/common';
import { AuthService } from './auth-service/AuthService';
import { UsersModule } from '../users/UsersModule';
import { AuthController } from './AuthController';
import { LocalStrategy } from './local-strategy/LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt-strategy/JWTStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import passwordResetSchema from './schemas/passwordResetSchema';
import EmailModule from '../email/EmailModule';
import PasswordResetService from './password-reset-service/PasswordResetService';

@Module( {
             providers: [ AuthService, LocalStrategy, JWTStrategy, PasswordResetService ],
             imports: [
                 EmailModule,
                 UsersModule,
                 PassportModule,
                 MongooseModule.forFeature( [
                                                {
                                                    name: 'PasswordReset',
                                                    schema: passwordResetSchema,
                                                },
                                            ] ),
             ],
             exports: [ AuthService, LocalStrategy, JWTStrategy, PasswordResetService ],
             controllers: [ AuthController ],
         } )
export class AuthModule
{
}
