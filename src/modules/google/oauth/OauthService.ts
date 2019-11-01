import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import UserDocument from '../../users/types/UserDocument';
import { Nullable } from '../../../types/Nullable';
import { UsersService } from '../../users/users-service/UsersService';

@Injectable()
export default class OauthService
{

    public constructor(
        protected readonly client: OAuth2Client,
        protected readonly usersService: UsersService,
    )
    {

    }

    public async handleCode( code: string ): Promise<Nullable<UserDocument>>
    {
        return null;
    }

}
