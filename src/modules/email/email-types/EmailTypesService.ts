import { Injectable, InternalServerErrorException } from '@nestjs/common';
import EmailService from '../email-service/EmailService';
import PasswordResetDocument from '../../auth/types/PasswordResetDocument';
import { ConfigService } from '../../config/config-service/ConfigService';

@Injectable()
export class EmailTypesService
{

    public constructor(
        protected readonly emailService: EmailService,
        protected readonly configService: ConfigService,
    )
    {
    }

    public async sendPasswordResetLink( passwordReset: PasswordResetDocument, email: string ): Promise<boolean>
    {
        try {
            const siteUrl = this.configService.get( 'SITE_URL' );
            const resetLink = passwordReset.generateLink( siteUrl );

            await this.emailService.sendEmail( {
                subject: this.getEmailTitle( 'Password reset request' ),
                html: `You receive this e-mail, because someone (hopefully you) have requested password reset on foods scrapper. To do that, click this <a href="${ resetLink }">link</a>.`,
                to: email,
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
