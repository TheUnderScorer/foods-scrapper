import { Module } from '@nestjs/common';
import OauthService from './oauth-service/OauthService';
import { ConfigModule } from '../config/ConfigModule';
import { ConfigService } from '../config/config-service/ConfigService';
import { OAuth2Client } from 'google-auth-library';
import { UsersModule } from '../users/UsersModule';
import GoogleAuthController from './GoogleAuthController';
import { UsersService } from '../users/users-service/UsersService';
import { google } from 'googleapis';
import { AuthModule } from '../auth/AuthModule';

@Module( {
    exports: [ OauthService ],
    providers: [
        {
            provide: OauthService,
            useFactory: ( config: ConfigService, usersService: UsersService ) =>
            {
                const client = new OAuth2Client(
                    config.get( 'GOOGLE_ID' ),
                    config.get( 'GOOGLE_SECRET' ),
                    config.get( 'GOOGLE_REDIRECT_URI' ),
                );
                const oauth = google.oauth2( {
                    version: 'v2',
                    auth: client,
                } );

                return new OauthService( client, oauth, usersService );
            },
            inject: [ ConfigService, UsersService ],
        },
    ],
    imports: [ ConfigModule, UsersModule, AuthModule ],
    controllers: [ GoogleAuthController ],
} )
export default class GoogleModule
{
}
