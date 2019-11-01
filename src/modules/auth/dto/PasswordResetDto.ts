import { IsString, MinLength } from 'class-validator';

export default class PasswordResetDto
{

    @IsString()
    public readonly token: string;

    @MinLength( 7 )
    public readonly password: string;
}
