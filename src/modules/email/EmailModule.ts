import { Module } from '@nestjs/common';
import EmailService from './email-service/EmailService';

@Module( {
    exports:   [ EmailService ],
    providers: [ EmailService ],
} )
export default class EmailModule
{
}
