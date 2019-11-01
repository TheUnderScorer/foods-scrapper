import User from '../../../../src/modules/users/types/User';

export default interface UserState
{
    readonly currentUser: User | null;
    readonly userFetched: boolean;
}
