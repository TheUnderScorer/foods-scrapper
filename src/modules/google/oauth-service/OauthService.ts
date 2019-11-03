import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { oauth2_v2 as OauthV2 } from 'googleapis';
import UserDocument from '../../users/types/UserDocument';
import { UsersService } from '../../users/users-service/UsersService';
import { v4 } from 'uuid';

@Injectable()
export default class OauthService
{

    public constructor(
        protected readonly client: OAuth2Client,
        protected readonly oauth: OauthV2.Oauth2,
        protected readonly usersService: UsersService,
    )
    {

    }

    public async handleCode( code: string ): Promise<UserDocument>
    {
        let credentials: Credentials;
        let userData: OauthV2.Schema$Userinfoplus;

        console.log( `Handling code: ${ code }` );

        try {
            const { tokens } = await this.client.getToken( code );

            credentials = tokens;
        } catch ( e ) {
            console.error( e );

            throw new InternalServerErrorException( `Google API error: ${ e.message }` );
        }

        this.client.setCredentials( credentials );

        try {
            const { data } = await this.oauth.userinfo.get();
            userData = data;
        } catch ( e ) {
            console.error( e );

            throw new InternalServerErrorException( `Google API error: ${ e.message }` );
        }

        const foundUser = await this.usersService.getByGoogleID( userData.id );

        if ( foundUser ) {
            return foundUser;
        }

        return await this.createFromUserData( userData );
    }

    protected async createFromUserData( { email, id }: OauthV2.Schema$Userinfoplus ): Promise<UserDocument>
    {
        const password = v4();
        const user = await this.usersService.create( email, password, ( user ) => user.googleID = id );

        await user.save();

        return user;
    }


}
