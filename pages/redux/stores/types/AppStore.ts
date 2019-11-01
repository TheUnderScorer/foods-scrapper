import ErrorState from '../../reducers/types/ErrorState';
import UserState from '../../reducers/types/UserState';

export default interface AppStore
{
    user: UserState;
    error: ErrorState
}
