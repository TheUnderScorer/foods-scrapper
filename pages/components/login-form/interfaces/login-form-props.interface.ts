import User from '../../../../src/modules/users/interfaces/user.interface';
import NextProps from '../../../interfaces/props/next-props.interface';

export default interface LoginFormProps extends NextProps
{
    onSubmit?: ( user: User, jwt: string ) => any;
}
