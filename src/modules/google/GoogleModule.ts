import { Module } from '@nestjs/common';
import OauthService from './oauth/OauthService';
import { ConfigModule } from '../config/ConfigModule';
import { ConfigService } from '../config/config-service/ConfigService';
import { OAuth2Client } from 'google-auth-library';

@Module( {
    exports:   [ OauthService ],
    providers: [
        {
            provide:    OauthService,
            useFactory: ( config: ConfigService ) => new OAuth2Client(
                config.get( 'GOOGLE_ID' ),
                config.get( 'GOOGLE_SECRET' ),
                config.get( 'GOOGLE_REDIRECT_URI' ),
            ),
        },
    ],
    imports:   [ ConfigModule ],
} )
export default class GoogleModule
{
}
