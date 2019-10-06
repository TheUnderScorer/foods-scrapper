import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import User from '../users/interfaces/user.interface';
import { Request as Req } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Result } from '../../interfaces/response.interface';
import { AuthService } from './auth-service/auth.service';
import UserDto from './dto/UserDto';
import { UsersService } from '../users/users-service/users.service';
import RegisterResult from './interfaces/register-result.interface';
import LoginResult from './interfaces/login-result.interface';

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
    public async login( @Request() request: Req ): Promise<Result<LoginResult>>
    {
        const jwt = await this.authService.login( request.user as User );

        return {
            result: {
                jwt,
            },
        };
    }

    @Post( 'register' )
    @UsePipes( new ValidationPipe() )
    public async register( @Body() { email, password }: UserDto ): Promise<Result<RegisterResult>>
    {
        const user = await this.usersService.create( email, password );
        const jwt = await this.authService.login( user );

        return {
            result: {
                user,
                jwt,
            },
        };
    }

}
