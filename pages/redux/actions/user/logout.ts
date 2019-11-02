import { Dispatch } from 'redux';
import { SetCurrentUser, UserActions } from './types/UserActions';
import { ErrorActions, SetError } from '../error/types/ErrorActions';
import AppStore from '../../stores/types/AppStore';
import UserState from '../../reducers/types/UserState';
import UserNotLoggedInException from '../../../exceptions/UserNotLoggedInException';
import client from '../../../http/client';
import { Routes } from '../../../http/types/Routes';
import ResponseResult from '../../../../src/types/ResponseResult';
import InvalidLogoutResponseException from './exceptions/InvalidLogoutResponseException';

const checkUserState = ( userStore: UserState ) => {
    if ( !userStore.currentUser ) {
        throw new UserNotLoggedInException( 'logout' );
    }
};

export default () => async ( dispatch: Dispatch<UserActions | ErrorActions>, getState: () => AppStore ): Promise<SetCurrentUser | SetError> => {
    try {
        checkUserState( getState().user );

        const response = await client.post<ResponseResult<boolean>>( Routes.logout );

        if ( response.data.result ) {
            return dispatch( {
                                 type: 'SetCurrentUser',
                                 payload: null,
                             } );
        }

        return dispatch( {
                             type: 'SetError',
                             payload: new InvalidLogoutResponseException(),
                         } );
    } catch ( e ) {
        return dispatch( {
                             type: 'SetError',
                             payload: e,
                         } );
    }
}
