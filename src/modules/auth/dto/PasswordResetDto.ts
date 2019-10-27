import { IsString } from 'class-validator';

export default class PasswordResetDto
{

    @IsString()
    public readonly token: string;
}
