import { Module } from '@nestjs/common';
import { UsersService } from './users-service/users.service';

@Module( {
    providers: [ UsersService ],
} )
export class UsersModule
{
}
