import { Module } from '@nestjs/common';
import EmailService from './email-service/EmailService';
import { EmailTypesService } from './email-types/EmailTypesService';
import { ConfigModule } from '../config/ConfigModule';

@Module( {
             exports: [ EmailService, EmailTypesService ],
             providers: [ EmailService, EmailTypesService ],
             imports: [ ConfigModule ],
         } )
export default class EmailModule
{
}
