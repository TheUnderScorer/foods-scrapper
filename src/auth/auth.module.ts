import { Module } from '@nestjs/common';
import { AuthService } from './auth-service/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema from '../users/schemas/user.schema';
import { UsersService } from '../users/users-service/users.service';

@Module( {
    providers:   [ AuthService, UsersService ],
    imports:     [
        UsersModule,
        MongooseModule.forFeature( [ {
            name:   'User',
            schema: userSchema,
        } ] ),
    ],
    controllers: [ AuthController ],
} )
export class AuthModule
{
}
