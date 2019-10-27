import { mount } from 'enzyme';
import * as React from 'react';
import PasswordResetDialog from './PasswordResetDialog';
import RequestPasswordResetDto from '../../../src/modules/auth/dto/RequestPasswordResetDto';
import * as faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import client from '../../http/client';
import { act } from 'react-dom/test-utils';
import { wait } from '../../../src/utils/timeout';
import { Routes } from '../../http/types/Routes';
import ThemeProvider from '../theme-provider/ThemeProvider';
import { ErrorCodes } from '../../../src/enums/ErrorCodes';
import ResponseResult from '../../../src/types/ResponseResult';

describe( 'PasswordResetDialog', () =>
{
    let mockAxios: MockAdapter;

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

        const initialValues: RequestPasswordResetDto = {
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

    it( 'PasswordResetRequestCreated error should show link to re-send e-mail with link', async () =>
    {
        const response: ResponseResult<boolean> = {
            error:   ErrorCodes.PasswordResetRequestCreated,
            result:  false,
            message: 'Test',
        };

        mockAxios.onPost( Routes.requestPasswordReset ).replyOnce( 401, response );

        const initialValues: RequestPasswordResetDto = {
            email: faker.internet.email(),
        };

        const component = mount( (
            <ThemeProvider>
                <PasswordResetDialog isOpen onClose={ jest.fn() } defaultValues={ initialValues }/>
            </ThemeProvider>
        ) );
        const form = component.find( 'form' );

        await act( async () =>
        {
            form.simulate( 'submit' );

            await wait( 100 );
        } );

        const notice = component.update().find( '.error-notice' ).at( 0 );
        expect( notice.text() ).toContain( 'Re-send e-mail with link?' );
    } );
} );
