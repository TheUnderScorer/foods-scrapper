import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users-service/users.service';
import User from '../../users/interfaces/user.interface';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService
{

    public constructor(
        protected readonly usersService: UsersService,
    )
    {
    }

    public async validateUser( email: string, password: string ): Promise<User | null>
    {
        const user = await this.usersService.findByEmail( email );

        const comparePassword = async () => await compare( password, user.password );

        if ( user && await comparePassword() ) {
            return user;
        }

        return null;
    }

}
