import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import UserDocument from '../interfaces/user-document.interface';
import { InjectModel } from '@nestjs/mongoose';
import User from '../interfaces/user.interface';

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
}
