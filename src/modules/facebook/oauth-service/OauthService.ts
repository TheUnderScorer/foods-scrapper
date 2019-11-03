import { Injectable } from '@nestjs/common';
import UserDocument from '../../users/types/UserDocument';
import { Nullable } from '../../../types/Nullable';
import GraphClient from '../graph-client/GraphClient';

@Injectable()
export default class OauthService
{

    public constructor( protected readonly client: GraphClient )
    {
    }

    public async handleCode( code: string ): Promise<Nullable<UserDocument>>
    {
        let response: any;

        try {
            response = await this.client.getMe( code );
        } catch ( e ) {
            console.error( e );
        }

        return null;
    }
}
