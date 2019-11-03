import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export default class GraphClient
{

    protected client = axios.create( {
        baseURL: 'https://graph.facebook.com/v3.1/',
    } );

    public async getMe( accessToken: string ): Promise<any>
    {
        return await this.client.get( '/me', {
            params: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                access_token: accessToken,
            },
        } );
    }

}
