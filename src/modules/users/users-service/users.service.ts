import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import UserDocument from '../interfaces/user-document.interface';
import { InjectModel } from '@nestjs/mongoose';
import User from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../config/config-service/config.service';

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

    public async findById( id: string ): Promise<User | undefined>
    {
        return this.model.findById( id ).exec();
    }

    public async findByEmail( email: string ): Promise<User | undefined>
    {
        return this.model.findOne( { email } ).exec();
    }

    public async create( email: string, password: string ): Promise<User>
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
