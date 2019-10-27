import { mount } from 'enzyme';
import * as React from 'react';
import PasswordResetDialog from './PasswordResetDialog';
import ResetPasswordDto from '../../../src/modules/auth/dto/ResetPasswordDto';
import * as faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import client from '../../http/client';
import { act } from 'react-dom/test-utils';
import { wait } from '../../../src/utils/timeout';
import { Routes } from '../../http/types/Routes';
import { createMuiTheme } from '@material-ui/core';
import ThemeProvider from '../theme-provider/ThemeProvider';

describe( 'PasswordResetDialog', () =>
{
    let mockAxios: MockAdapter;

    const theme = createMuiTheme();

    beforeEach( () =>
    {
        mockAxios = new MockAdapter( client );
    } );

    it( 'renders without crashing', () =>
    {
        mount( <PasswordResetDialog onClose={ jest.fn() }/> );
    } );

    it( 'should send reset password email', async () =>
    {
        mockAxios.onPost( Routes.requestPasswordReset ).replyOnce( 200, {
            result: true,
        } );

        const onSubmit = jest.fn();

        const initialValues: ResetPasswordDto = {
            email: faker.internet.email(),
        };

        const component = mount( (
            <ThemeProvider>
                <PasswordResetDialog isOpen onSubmit={ onSubmit } onClose={ jest.fn() } defaultValues={ initialValues }/>
            </ThemeProvider>
        ) );
        const form = component.find( 'form' );

        await act( async () =>
        {
            form.simulate( 'submit' );

            await wait( 100 );
        } );

        const notice = component.update().find( '.success-notice' ).at( 0 );
        const noticeText = notice.find( '.notice-text' ).at( 0 ).text();

        expect( onSubmit ).toBeCalledWith( true );
        expect( noticeText ).toEqual( 'We have sent you an e-mail with password reset link.' );
    } );
} );
