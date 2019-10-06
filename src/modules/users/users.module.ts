import { Module } from '@nestjs/common';
import { UsersService } from './users-service/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema from './schemas/user.schema';

@Module( {
    providers: [ UsersService ],
    exports:   [ UsersService ],
    imports:   [
        MongooseModule.forFeature( [ {
            name:   'User',
            schema: userSchema,
        } ] ),
    ],
} )
export class UsersModule
{
}
