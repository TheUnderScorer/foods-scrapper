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

        const initialValues: ResetPasswordDto = {
            email: faker.internet.email(),
        };

        const component = mount( <PasswordResetDialog isOpen onSubmit={ onSubmit } onClose={ jest.fn() } defaultValues={ initialValues }/> );
        const form = component.find( 'form' );

        await act( async () =>
        {
            form.simulate( 'submit' );

            await wait( 100 );
        } );

        expect( onSubmit ).toBeCalledWith( true );
    } );
} );
