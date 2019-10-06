import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import User from '../users/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req } from 'express';

@Controller()
export class AuthController
{

    @Post( '/login' )
    @UseGuards( AuthGuard( 'local' ) )
    public async login( @Request() request: Req ): Promise<User>
    {
        return request.user as User;
    }

}
