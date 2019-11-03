import { Module } from '@nestjs/common';
import OauthService from './oauth-service/OauthService';

@Module( {
    providers: [ OauthService ],
    exports: [ OauthService ],
} )
export default class FacebookModule
{
}
