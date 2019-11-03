import * as React from 'react';
import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { AppBar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import HeaderProps from './types/HeaderProps';
import { useDispatch, useSelector } from 'react-redux';
import AppStore from '../../redux/stores/types/AppStore';
import User from '../../../src/modules/users/types/User';
import { Nullable } from '../../../src/types/Nullable';
import { Input, MoreVert } from '@material-ui/icons';
import styled from 'styled-components';
import logout from '../../redux/actions/user/logout';

const Spacer = styled.div`
    flex-grow: 1;
`;

const Header: FC<HeaderProps> = ( { title } ) =>
{
    const dispatch = useDispatch();

    const handleLogout = useCallback( () =>
    {
        dispatch( logout() );
    }, [ dispatch ] );

    const currentUser = useSelector<AppStore, Nullable<User>>( ( store ) => store.user.currentUser );

    const [ anchorEl, setAnchorEl ] = useState<Nullable<HTMLButtonElement>>( null );
    const toggleMenu = useCallback<MouseEventHandler>( ( event ) => setAnchorEl( anchorEl ? null : (event.target as HTMLButtonElement) ), [ anchorEl ] );
    const closeMenu = useCallback( () => setAnchorEl( null ), [] );

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h5">
                    { title }
                </Typography>
                <Spacer/>
                { !!currentUser &&
                <>
                    <IconButton size="small" onClick={ toggleMenu } className="menu-icon" color="inherit">
                        <MoreVert fontSize="large"/>
                    </IconButton>
                    <Menu onClose={ closeMenu } open={ !!anchorEl } anchorEl={ anchorEl }>
                        <MenuItem onClick={ handleLogout } className="logout">
                            <ListItemIcon>
                                <Input/>
                            </ListItemIcon>
                            <ListItemText primary="Logout"/>
                        </MenuItem>
                    </Menu>
                </>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;
