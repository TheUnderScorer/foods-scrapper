import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import User from '../users/types/User';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth-service/AuthService';
import UserDto from './dto/UserDto';
import { UsersService } from '../users/users-service/UsersService';
import { NotLoggedGuard } from './guards/NotLoggedGuard';
import RequestPasswordResetDto from './dto/RequestPasswordResetDto';
import PasswordResetService from './password-reset-service/PasswordResetService';
import PasswordResetDto from './dto/PasswordResetDto';

@Controller( 'auth' )
export class AuthController
{
    public constructor(
        protected readonly authService: AuthService,
        protected readonly usersService: UsersService,
        protected readonly passwordResetService: PasswordResetService,
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

    @UseGuards( new NotLoggedGuard() )
    @Post( 'request-password-reset' )
    public async requestPasswordReset( @Body() { email }: RequestPasswordResetDto, @Res() response: Response )
    {
        const passwordReset = await this.passwordResetService.createForUser( email );

        return response.json( {
                                  result: !!passwordReset,
                              } );
    }

    @Get( 'reset-password' )
    public async renderResetPassword( @Res() response: Response )
    {
        return response.render( 'ResetPassword' );
    }

    @UseGuards( new NotLoggedGuard() )
    @Post( 'reset-password' )
    public async resetPassword( @Body() { token, password }: PasswordResetDto, @Res() response: Response )
    {
        const result = await this.passwordResetService.resetPassword( token, password );

        return response.json( {
                                  result,
                              } );
    }

    @Post( 'register' )
    @UsePipes( new ValidationPipe() )
    @UseGuards( new NotLoggedGuard() )
    public async register( @Body() { email, password }: UserDto, @Res() response: Response )
    {
        const user = await this.usersService.create( email, password );
        const jwt = await this.authService.login( user, response );

        return response.json( {
                                  result: {
                                      user,
                                      jwt,
                                  },
                              } );
    }

    @Post( 'logout' )
    @UseGuards( AuthGuard( 'jwt' ) )
    public async logout( @Body() user: User, @Res() response: Response )
    {
        this.authService.logout( response );

        return response.json( {
                                  result: user,
                              } );
    }

    @Post( 'resend-password-reset-request' )
    @UseGuards( new NotLoggedGuard() )
    public async reSendPasswordResetRequest(
        @Body() { email }: RequestPasswordResetDto,
        @Res() response: Response,
    )
    {
        const result = await this.passwordResetService.reSendEmail( email );

        return response.json( { result } );
    }

}
