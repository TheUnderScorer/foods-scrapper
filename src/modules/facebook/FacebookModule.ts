import { Module } from '@nestjs/common';
import OauthService from './oauth-service/OauthService';
import GraphClient from './graph-client/GraphClient';

@Module( {
    providers: [ OauthService, GraphClient ],
    exports: [ OauthService ],
} )
export default class FacebookModule
{
}
