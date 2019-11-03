import { Module } from '@nestjs/common';
import { UsersService } from './users-service/UsersService';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './UsersController';
import userSchema from './schemas/userSchema';

@Module( {
    providers: [ UsersService ],
    exports: [ UsersService ],
    imports: [
        MongooseModule.forFeature( [ {
            name: 'User',
            schema: userSchema,
        } ] ),
    ],
    controllers: [ UsersController ],
} )
export class UsersModule
{
}
