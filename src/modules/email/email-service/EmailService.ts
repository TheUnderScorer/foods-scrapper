import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '../../config/config-service/ConfigService';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

@Injectable()
export default class EmailService
{

    protected readonly transporter: Mail;

    public constructor( protected readonly configService: ConfigService )
    {
        this.transporter = createTransport( {
                                                service: 'gmail',
                                                auth: {
                                                    user: configService.get( 'MAIL_USER' ),
                                                    pass: configService.get( 'MAIL_PASS' ),
                                                },
                                                tls: {
                                                    rejectUnauthorized: false,
                                                },
                                            } ) as Mail;
    }

    public async sendEmail( options: MailOptions ): Promise<boolean>
    {
        if ( !options.from ) {
            options.from = this.configService.get( 'SITE_EMAIL' );
        }

        return await this.transporter.sendMail( options );
    }

}
