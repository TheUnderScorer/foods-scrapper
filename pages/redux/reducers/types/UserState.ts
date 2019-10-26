import User from '../../../../src/modules/users/types/User';

export default interface UserReducer
{
    currentUser: User | null;
}
