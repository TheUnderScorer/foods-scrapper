import User from '../../../../src/modules/users/interfaces/user.interface';
import NextProps from '../../../interfaces/props/next-props.interface';

export default interface RegisterFormProps extends NextProps
{
    onSubmit?: ( jwt: string, user: User ) => any;
    redirectUrl?: string;
}
