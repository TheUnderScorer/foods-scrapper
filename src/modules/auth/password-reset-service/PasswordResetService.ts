import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../../users/users-service/UsersService';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import PasswordResetDocument from '../types/PasswordResetDocument';
import PasswordReset from '../types/PasswordReset';
import { v4 } from 'uuid';
import UserDocument from '../../users/types/UserDocument';
import { Nullable } from '../../../types/Nullable';
import PasswordResetRequestCreatedException from './exceptions/PasswordResetRequestCreatedException';
import EmailService from '../../email/email-service/EmailService';
import { ConfigService } from '../../config/config-service/ConfigService';

@Injectable()
export default class PasswordResetService
{

    public constructor(
        @InjectModel( 'PasswordReset' )
        protected readonly model: Model<PasswordResetDocument>,
        protected readonly usersService: UsersService,
        protected readonly emailService: EmailService,
        protected readonly configService: ConfigService,
    )
    {
    }

    public async findByUser( user: UserDocument ): Promise<PasswordResetDocument | undefined>
    {
        return await this.model.findOne( { user } ).populate( 'passwordReset' ).exec();
    }

    public async findByToken( token: string ): Promise<PasswordResetDocument | undefined>
    {
        return await this.model.findOne( { token } ).populate( 'user' ).exec();
    }

    public async findByEmail( email: string ): Promise<Nullable<PasswordResetDocument> | undefined>
    {
        const user = await this.usersService.findByEmail( email );

        if ( !user ) {
            return null;
        }

        return await this.findByUser( user );
    }

    public async createForUser( email: string ): Promise<PasswordResetDocument>
    {
        const user = await this.usersService.findByEmail( email );

        if ( !user ) {
            throw new BadRequestException( `Unable to find user with e-mail ${ email }.` );
        }

        if ( await this.haveRequestedReset( email ) ) {
            throw new PasswordResetRequestCreatedException( email );
        }

        const passwordReset = new this.model( {
            user,
            token: v4(),
        } );

        await passwordReset.save();

        this.sendEmail( passwordReset, email );

        return passwordReset;
    }

    public async sendEmail( passwordReset: PasswordResetDocument, email: string ): Promise<boolean>
    {
        try {
            const siteUrl = this.configService.get( 'SITE_URL' );
            const resetLink = passwordReset.generateLink( siteUrl );

            await this.emailService.sendEmail( {
                subject: 'Foods Scrapper - Password reset request',
                html:    `You receive this e-mail, because someone (hopefully you) have requested password reset on foods scrapper. To do that, click this <a href="${ resetLink }">link</a>.`,
                to:      email,
            } );
        } catch ( e ) {
            console.error( { e } );

            throw new InternalServerErrorException( 'Unable to send e-mail with password reset link, please try again.' );
        }

        return true;
    }

    public async resetPassword( token: string ): Promise<UserDocument>
    {
        const passwordReset = await this.findByToken( token );

        if ( !passwordReset ) {
            throw new BadRequestException( 'No password reset request found.' );
        }

        if ( !passwordReset.user ) {
            throw new BadRequestException( 'No user found.' );
        }

        const { user } = passwordReset;
        user.password = v4();
        await user.save();

        return user;
    }

    public async haveRequestedReset( email: string ): Promise<boolean>
    {
        const request = await this.findByEmail( email );

        return !!request;
    }

}
