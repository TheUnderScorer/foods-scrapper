import { useSelector } from 'react-redux';
import AppStore from '../redux/stores/types/AppStore';
import UserState from '../redux/reducers/types/UserState';
import { useEffect } from 'react';
import redirect from '../http/redirect';
import { Routes } from '../http/types/Routes';

export default ( redirectUrl: string = Routes.login ) =>
{
    const userReducer = useSelector<AppStore, UserState>( store => store.user );

    useEffect( () =>
    {
        if ( userReducer.userFetched && !userReducer.currentUser ) {
            redirect( redirectUrl );
        }
    }, [ userReducer ] );
}
