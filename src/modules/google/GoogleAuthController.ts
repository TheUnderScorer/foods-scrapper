import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import OauthService from './oauth-service/OauthService';
import OauthDto from './dto/OauthDto';
import { Response } from 'express';
import { NotLoggedGuard } from '../auth/guards/NotLoggedGuard';
import { AuthService } from '../auth/auth-service/AuthService';

@Controller( 'auth/google' )
export default class GoogleAuthController
{
    public constructor(
        protected readonly oauth: OauthService,
        protected readonly auth: AuthService,
    )
    {

    }

    @UseGuards( new NotLoggedGuard() )
    @Get()
    public async handleLogin( @Query() { code }: OauthDto, @Res() response: Response )
    {
        const user = await this.oauth.handleCode( code );

        await this.auth.login( user, response );

        return response.json( {
            result: user,
        } );
    }

}
