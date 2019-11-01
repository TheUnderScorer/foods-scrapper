import { IsString } from 'class-validator';

export default class OauthDto
{
    @IsString()
    public readonly code: string;
}
