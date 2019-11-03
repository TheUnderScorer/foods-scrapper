import { Injectable } from '@nestjs/common';
import UserDocument from '../../users/types/UserDocument';
import GraphClient from '../graph-client/GraphClient';
import UserData from '../graph-client/types/UserData';
import { UsersService } from '../../users/users-service/UsersService';
import { v4 } from 'uuid';

@Injectable()
export default class OauthService
{

    public constructor(
        protected readonly client: GraphClient,
        protected readonly usersService: UsersService,
    )
    {
    }

    public async handleCode( code: string ): Promise<UserDocument>
    {
        let userData: UserData;

        try {
            const { data } = await this.client.getMe( code );

            userData = data;
        } catch ( e ) {
            console.error( e );
        }

        const foundUser = await this.usersService.getByFacebookID( userData.id );

        if ( foundUser ) {
            return foundUser;
        }

        return await this.createUser( userData );
    }

    protected async createUser( { email, id }: UserData ): Promise<UserDocument>
    {
        const password = v4();

        return await this.usersService.create( email, password, ( user ) => user.facebookID = id );
    }
}
