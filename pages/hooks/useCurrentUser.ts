import useAxios, { configure } from 'axios-hooks';
import client from '../http/client';
import ResponseResult from '../../src/types/ResponseResult';
import User from '../../src/modules/users/types/User';
import { Routes } from '../http/types/Routes';

const useCurrentUser = () =>
{
    configure( {
        axios: client,
    } );

    return useAxios<ResponseResult<User>>( {
        url:    Routes.getMe,
        method: 'GET',
    } );
};

export default useCurrentUser;
