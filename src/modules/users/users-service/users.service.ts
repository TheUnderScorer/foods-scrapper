import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import UserDocument from '../interfaces/user-document.interface';
import { InjectModel } from '@nestjs/mongoose';
import User from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService
{

    public constructor(
        @InjectModel( 'User' )
        protected readonly model: Model<UserDocument>,
    )
    {
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

        const hashedPassword = await bcrypt.hash( password, 10 );

        const result = new this.model( { email, password: hashedPassword } );
        await result.save();

        return result;
    }
}
