import { Module } from '@nestjs/common';
import { AuthService } from './auth-service/auth.service';
import { UsersModule } from '../users/users.module';

@Module( {
    providers: [ AuthService ],
    imports:   [ UsersModule ],
} )
export class AuthModule
{
}
