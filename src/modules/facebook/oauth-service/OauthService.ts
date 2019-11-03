import { Injectable } from '@nestjs/common';
import UserDocument from '../../users/types/UserDocument';
import { Nullable } from '../../../types/Nullable';

@Injectable()
export default class OauthService
{
    public async handleCode( code: string ): Promise<Nullable<UserDocument>>
    {
        return null;
    }
}
