import { UnauthorizedException } from '@nestjs/common';

export default class PasswordResetRequestCreatedException extends UnauthorizedException
{
    public readonly name: string = 'PasswordResetRequestCreated';

    public constructor( private readonly email: string )
    {
        super( `There is pending password reset request for email ${ email }.`, 'PasswordResetRequestCreated' );
    }
}
