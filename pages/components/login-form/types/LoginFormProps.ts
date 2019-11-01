import User from '../../../../src/modules/users/types/User';
import UserDto from '../../../../src/modules/auth/dto/UserDto';

export default interface LoginFormProps
{
    onSubmit?: ( user: User, jwt: string ) => any;
    defaults?: UserDto;
}
