import { Module } from '@nestjs/common';
import EmailService from './email-service/EmailService';
import { EmailTypesService } from './email-types/EmailTypesService';

@Module( {
    exports:   [ EmailService, EmailTypesService ],
    providers: [ EmailService, EmailTypesService ],
} )
export default class EmailModule
{
}
