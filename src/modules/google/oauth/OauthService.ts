import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export default class OauthService
{

    public constructor( protected readonly client: OAuth2Client )
    {

    }

    public async handleCode( code: string )
    {

    }

}
