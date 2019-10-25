import useAxios, { configure } from 'axios-hooks';
import client from '../http/client';
import { Result } from '../../src/interfaces/response.interface';
import User from '../../src/modules/users/interfaces/user.interface';

const useCurrentUser = () =>
{
    configure( {
        axios: client,
    } );

    return useAxios<Result<User>>( {
        url:    '/users/me',
        method: 'GET',
    } );
};

export default useCurrentUser;
