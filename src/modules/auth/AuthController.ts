import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import User from '../users/types/User';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth-service/AuthService';
import UserDto from './dto/UserDto';
import { UsersService } from '../users/users-service/UsersService';
import { NotLoggedGuard } from './guards/NotLoggedGuard';
import { v4 } from 'uuid';

@Controller( 'auth' )
export class AuthController
{
    public constructor(
        protected readonly authService: AuthService,
        protected readonly usersService: UsersService,
    )
    {
    }

    @Post( 'login' )
    @UseGuards( AuthGuard( 'local' ) )
    public async login( @Req() request: Request, @Res() res: Response )
    {
        const jwt = await this.authService.login( request.user as User, res );

        return res.json( {
            result: {
                jwt,
            },
        } );
    }

    @Get( 'login' )
    public getLoginPage( @Res() response: Response )
    {
        return response.render( 'Login' );
    }

    @Get( 'register' )
    public getRegisterPage( @Res() response: Response )
    {
        return response.render( 'Register' );
    }

    @Get( '/reset-password' )
    @UseGuards( new NotLoggedGuard() )
    public async resetPassword( @Req() request: Request, @Res() response: Response )
    {
        const { token } = request.query;

        if ( !token ) {
            throw new BadRequestException( 'No reset password token provided.' );
        }

        const newPassword = v4();
    }

    @Post( 'register' )
    @UsePipes( new ValidationPipe() )
    @UseGuards( new NotLoggedGuard() )
    public async register( @Body() { email, password }: UserDto, @Res() res: Response )
    {
        const user = await this.usersService.create( email, password );
        const jwt = await this.authService.login( user, res );

        return res.json( {
            result: {
                user,
                jwt,
            },
        } );
    }

}
