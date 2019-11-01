import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import UserDocument from '../types/UserDocument';
import { InjectModel } from '@nestjs/mongoose';
import User from '../types/User';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../config/config-service/ConfigService';

@Injectable()
export class UsersService
{

    @Inject()
    protected readonly config: ConfigService;

    public constructor(
        @InjectModel( 'User' )
        protected readonly model: Model<UserDocument>,
    )
    {
    }

    public async findById( id: string ): Promise<UserDocument | undefined>
    {
        return await this.model.findById( id ).exec();
    }

    public async findByEmail( email: string ): Promise<UserDocument | undefined>
    {
        return await this.model.findOne( { email } ).exec();
    }

    public async create( email: string, password: string ): Promise<UserDocument>
    {
        if ( await this.findByEmail( email ) ) {
            throw new BadRequestException( `Provided email ${ email } is already taken.` );
        }

        const rounds = parseInt( this.config.get( 'BCRYPT_ROUNDS' ) );
        const hashedPassword = await bcrypt.hash( password, rounds );

        const result = new this.model( { email, password: hashedPassword } );
        await result.save();

        return result;
    }
}
