import User from '../../../../src/modules/users/interfaces/user.interface';

export default interface LoginFormProps
{
    onSubmit?: ( user: User, jwt: string ) => any;
}
