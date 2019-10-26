import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config-service/ConfigService';

@Global()
@Module( {
    providers: [
        {
            provide:  ConfigService,
            useValue: new ConfigService( `${ process.env.NODE_ENV || 'development' }.env` ),
        },
    ],
    exports:   [ ConfigService ],
} )
export class ConfigModule
{
}
