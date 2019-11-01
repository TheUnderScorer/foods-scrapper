import { IsEmail, IsString, Length } from 'class-validator';

export default class UserDto
{
    @IsEmail()
    public readonly email: string;

    @IsString()
    @Length( 7 )
    public readonly password: string;
}
