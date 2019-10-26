import { IsEmail } from 'class-validator';

export default class ResetPasswordDto
{
    @IsEmail()
    public readonly email: string;
}
