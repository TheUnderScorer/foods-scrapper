import { Module } from '@nestjs/common';
import OauthService from './oauth-service/OauthService';
import GraphClient from './graph-client/GraphClient';
import FacebookAuthController from './FacebookAuthController';
import { UsersModule } from '../users/UsersModule';
import { AuthModule } from '../auth/AuthModule';
import axios from 'axios';

@Module( {
    providers: [
        OauthService,
        {
            provide: GraphClient,
            useFactory: () =>
            {
                const client = axios.create( {
                    baseURL: 'https://graph.facebook.com/v3.1/',
                } );

                return new GraphClient( client );
            },
        },
    ],
    exports: [ OauthService ],
    imports: [ UsersModule, AuthModule ],
    controllers: [ FacebookAuthController ],
} )
export default class FacebookModule
{
}
