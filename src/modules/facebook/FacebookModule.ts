import { Module } from '@nestjs/common';
import OauthService from './oauth-service/OauthService';
import GraphClient from './graph-client/GraphClient';
import FacebookAuthController from './FacebookAuthController';
import { UsersModule } from '../users/UsersModule';
import { AuthModule } from '../auth/AuthModule';

@Module( {
    providers: [ OauthService, GraphClient ],
    exports: [ OauthService ],
    imports: [ UsersModule, AuthModule ],
    controllers: [ FacebookAuthController ],
} )
export default class FacebookModule
{
}
