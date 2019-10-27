import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '../../config/config-service/ConfigService';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import PasswordResetDocument from '../../auth/types/PasswordResetDocument';

@Injectable()
export default class EmailService
{

    protected readonly transporter: Mail;

    public constructor( protected readonly configService: ConfigService )
    {
        this.transporter = createTransport( {
            service: 'gmail',
            auth:    {
                user: configService.get( 'MAIL_USER' ),
                pass: configService.get( 'MAIL_PASS' ),
            },
            tls:     {
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

    public async sendPasswordResetLink( passwordReset: PasswordResetDocument, email: string ): Promise<boolean>
    {
        try {
            const siteUrl = this.configService.get( 'SITE_URL' );
            const resetLink = passwordReset.generateLink( siteUrl );

            await this.sendEmail( {
                subject: this.getEmailTitle( 'Password reset request' ),
                html:    `You receive this e-mail, because someone (hopefully you) have requested password reset on foods scrapper. To do that, click this <a href="${ resetLink }">link</a>.`,
                to:      email,
            } );
        } catch ( e ) {
            console.error( { e } );

            throw new InternalServerErrorException( 'Unable to send e-mail with password reset link, please try again.' );
        }

        return true;
    }

    protected getEmailTitle( title: string ): string
    {
        return `[Foods Scrapper] - ${ title }`;
    }

}
