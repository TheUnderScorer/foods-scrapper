import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import User from './types/User';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import ResponseResult from '../../types/ResponseResult';

@Controller( 'users' )
export class UsersController
{

    @UseGuards( AuthGuard( 'jwt' ) )
    @Get( 'me' )
    public async getMe( @Req() req: Request ): Promise<ResponseResult<User>>
    {
        return {
            result: req.user as User,
        };
    }

}
