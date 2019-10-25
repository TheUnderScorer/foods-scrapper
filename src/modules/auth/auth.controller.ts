import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import User from '../users/interfaces/user.interface';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth-service/auth.service';
import UserDto from './dto/UserDto';
import { UsersService } from '../users/users-service/users.service';
import { NotLoggedGuard } from './guards/not-logged-guard.service';

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
