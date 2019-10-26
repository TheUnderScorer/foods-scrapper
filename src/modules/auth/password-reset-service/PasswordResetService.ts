import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users-service/UsersService';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import PasswordResetDocument from '../types/PasswordResetDocument';
import PasswordReset from '../types/PasswordReset';
import { v4 } from 'uuid';
import UserDocument from '../../users/types/UserDocument';

@Injectable()
export default class PasswordResetService
{

    public constructor(
        @InjectModel( 'PasswordReset' )
        protected readonly model: Model<PasswordResetDocument>,
        protected readonly usersService: UsersService,
    )
    {
    }

    public async findByUserId( id: Schema.Types.ObjectId | string ): Promise<PasswordResetDocument | undefined>
    {
        return await this.model.findOne( { user: id } ).populate( 'passwordReset' ).exec();
    }

    public async findByToken( token: string ): Promise<PasswordResetDocument | undefined>
    {
        return await this.model.findOne( { token } ).populate( 'user' ).exec();
    }

    public async createForUser( email: string ): Promise<PasswordResetDocument>
    {
        const user = await this.usersService.findByEmail( email );

        if ( !user ) {
            throw new BadRequestException( `Unable to find user with e-mail ${ email }.` );
        }

        const passwordReset = new this.model( {
            user,
            token: v4(),
        } );

        await passwordReset.save();

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

}
