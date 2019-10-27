import { IsEmail } from 'class-validator';

export default class RequestPasswordResetDto
{
    @IsEmail()
    public readonly email: string;
}
