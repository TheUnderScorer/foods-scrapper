import User from '../../../../src/modules/users/types/User';
import NextProps from '../../../types/props/NextProps';
import RegisterInput from './RegisterInput';

export default interface RegisterFormProps extends NextProps
{
    onSubmit?: ( jwt: string, user: User ) => any;
    redirectUrl?: string;
    initialValues?: Partial<RegisterInput>
}
