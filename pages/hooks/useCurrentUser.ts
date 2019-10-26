import useAxios, { configure } from 'axios-hooks';
import client from '../http/client';
import ResponseResult from '../../src/types/ResponseResult';
import User from '../../src/modules/users/types/User';

const useCurrentUser = () =>
{
    configure( {
        axios: client,
    } );

    return useAxios<ResponseResult<User>>( {
        url:    '/users/me',
        method: 'GET',
    } );
};

export default useCurrentUser;
