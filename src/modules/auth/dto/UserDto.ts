import { IsEmail, IsString } from 'class-validator';

export default class UserDto
{
    @IsEmail()
    public readonly email: string;

    @IsString()
    public readonly password: string;
}
