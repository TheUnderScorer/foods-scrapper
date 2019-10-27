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
