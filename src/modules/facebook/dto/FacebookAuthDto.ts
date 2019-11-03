import { IsString } from 'class-validator';

export default class FacebookAuthDto
{
    @IsString()
    public readonly token: string;
}