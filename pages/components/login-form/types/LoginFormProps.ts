import User from '../../../../src/modules/users/types/User';

export default interface LoginFormProps
{
    onSubmit?: ( user: User, jwt: string ) => any;
}
