import { Module } from '@nestjs/common';
import OauthService from './oauth-service/OauthService';
import GraphClient from './graph-client/GraphClient';
import FacebookAuthController from './FacebookAuthController';

@Module( {
    providers: [ OauthService, GraphClient ],
    exports: [ OauthService ],
    controllers: [ FacebookAuthController ],
} )
export default class FacebookModule
{
}
