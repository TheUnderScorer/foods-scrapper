import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users-service/UsersService';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import PasswordResetDocument from '../types/PasswordResetDocument';
import PasswordReset from '../types/PasswordReset';
import { v4 } from 'uuid';
import UserDocument from '../../users/types/UserDocument';
import { Nullable } from '../../../types/Nullable';
import PasswordResetRequestCreatedException from './exceptions/PasswordResetRequestCreatedException';
import { ConfigService } from '../../config/config-service/ConfigService';
import { EmailTypesService } from '../../email/email-types/EmailTypesService';
import { hash } from 'bcrypt';
import ResetPasswordResult from './types/ResetPasswordResult';

@Injectable()
export default class PasswordResetService
{

    public constructor(
        @InjectModel( 'PasswordReset' )
        protected readonly model: Model<PasswordResetDocument>,
        protected readonly usersService: UsersService,
        protected readonly configService: ConfigService,
        protected readonly emailTypesService: EmailTypesService,
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

        await this.emailTypesService.sendPasswordResetLink( passwordReset, email );

        return passwordReset;
    }

    public async resetPassword( token: string, password: string ): Promise<ResetPasswordResult>
    {
        const passwordReset = await this.findByToken( token );

        if ( !passwordReset ) {
            throw new BadRequestException( 'No password reset request found.' );
        }

        if ( !passwordReset.user ) {
            throw new BadRequestException( 'No user found.' );
        }

        const { user } = passwordReset;
        const rounds = parseInt( this.configService.get( 'BCRYPT_ROUNDS' ) );

        user.password = await hash( password, rounds );
        await user.save();

        await passwordReset.remove();

        return {
            user,
            password,
        };
    }

    public async reSendEmail( email: string ): Promise<boolean>
    {
        const request = await this.findByEmail( email );

        if ( !request ) {
            throw new BadRequestException( `No password reset request found for ${ email }.` );
        }

        return await this.emailTypesService.sendPasswordResetLink( request, email );
    }

    public async haveRequestedReset( email: string ): Promise<boolean>
    {
        const request = await this.findByEmail( email );

        return !!request;
    }

}
