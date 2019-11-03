import { Body, Controller, Post, Res } from '@nestjs/common';
import FacebookAuthDto from './dto/FacebookAuthDto';
import { Response } from 'express';
import OauthService from './oauth-service/OauthService';
import { AuthService } from '../auth/auth-service/AuthService';

@Controller( 'auth/facebook' )
export default class FacebookAuthController
{
    public constructor(
        protected readonly oauth: OauthService,
        protected readonly auth: AuthService,
    )
    {
    }

    @Post()
    public async handleLogin( @Body() { token }: FacebookAuthDto, @Res() response: Response )
    {
        const user = await this.oauth.handleCode( token );

        await this.auth.login( user, response );

        return response.json( {
            result: user,
        } );
    }
}
