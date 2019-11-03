import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import UserData from './types/UserData';

@Injectable()
export default class GraphClient
{

    protected client = axios.create( {
        baseURL: 'https://graph.facebook.com/v3.1/',
    } );

    public async getMe( accessToken: string, fields: string[] = [ 'email' ] ): Promise<AxiosResponse<UserData>>
    {
        return await this.client.get<UserData>( '/me', {
            params: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                access_token: accessToken,
                fields: fields.join( ',' ),
            },
        } );
    }

}
