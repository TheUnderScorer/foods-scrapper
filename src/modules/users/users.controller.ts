import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import User from './interfaces/user.interface';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Result } from '../../interfaces/response.interface';

@Controller( 'users' )
export class UsersController
{

    @UseGuards( AuthGuard( 'jwt' ) )
    @Get( 'me' )
    public async getMe( @Req() req: Request ): Promise<Result<User>>
    {
        return {
            result: req.user as User,
        };
    }

}
