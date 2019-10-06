import { IsEmail, IsString } from 'class-validator';

export default class UserDto
{
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}
