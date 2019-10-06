import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import User from '../users/interfaces/user.interface';
import { Request as Req } from 'src/express';
import { AuthGuard } from '@nestjs/passport';

@Controller( 'auth' )
export class AuthController
{

    @Post( 'login' )
    @UseGuards( AuthGuard( 'local' ) )
    public async login( @Request() request: Req ): Promise<User>
    {
        return request.user as User;
    }

}
