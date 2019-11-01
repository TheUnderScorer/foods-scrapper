import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import OauthService from './oauth/OauthService';
import OauthDto from './dto/OauthDto';
import { Response } from 'express';
import { NotLoggedGuard } from '../auth/guards/NotLoggedGuard';

@Controller( 'auth/google' )
export default class GoogleAuthController
{
    public constructor(
        protected readonly oauth: OauthService,
    )
    {

    }

    @UseGuards( new NotLoggedGuard() )
    @Get()
    public async handleLogin( @Query() { code }: OauthDto, @Res() response: Response )
    {
        return response.json( {
            result: await this.oauth.handleCode( code ),
        } );
    }

}
