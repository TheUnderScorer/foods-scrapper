import LoginForm from './LoginForm';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import PasswordResetDialog from '../password-reset-dialog/PasswordResetDialog';
import UserDto from '../../../src/modules/auth/dto/UserDto';
import * as faker from 'faker';
import redirect from '../../http/redirect';
import MockAdapter from 'axios-mock-adapter';
import client from '../../http/client';
import { Routes } from '../../http/types/Routes';
import { wait } from '../../../src/utils/timeout';
import ThemeProvider from '../theme-provider/ThemeProvider';
import mountWithStore from '../../test/mountWithStore';

jest.mock( '../../http/redirect', () => ( {
    default: jest.fn(),
} ) );

describe( 'LoginForm', () =>
{
    let mockAxios: MockAdapter;

    beforeEach( () =>
    {
        mockAxios = new MockAdapter( client );
    } );

    it( 'renders without crashing', () =>
    {
        mountWithStore( <LoginForm/>, {} );
    } );

    it( 'should handle login', async () =>
    {
        const onSubmit = jest.fn();

        const result = {
            user: {
                _id: '1',
            },
            jwt:  faker.random.uuid(),
        };
        mockAxios.onPost( Routes.login ).replyOnce( 201, {
            result,
        } );

        const mockRedirect = redirect as jest.Mock;

        const dto: UserDto = {
            email:    faker.internet.email(),
            password: faker.internet.password(),
        };

        const { component } = mountWithStore( (
            <ThemeProvider>
                <LoginForm onSubmit={ onSubmit } defaults={ dto }/>
            </ThemeProvider>
        ), {} );
        const form = component.find( 'form' );

        await act( async () =>
        {
            form.simulate( 'submit' );

            await wait( 600 );
        } );

        expect( onSubmit ).toBeCalledWith( result.user, result.jwt );
        expect( mockRedirect ).toBeCalledWith( '/' );
    } );

    it( 'clicking Forgot Password should open PasswordResetDialog', () =>
    {
        const { component } = mountWithStore( <LoginForm/>, {} );
        const btn = component.find( '.forgot-password-btn' ).at( 0 );

        act( () =>
        {
            btn.simulate( 'click' );
        } );

        const dialog = component.update().find( PasswordResetDialog );
        expect( dialog.prop( 'isOpen' ) ).toBeTruthy();
    } );
} );
