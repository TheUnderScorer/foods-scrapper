import { mount } from 'enzyme';
import RegisterForm from './RegisterForm';
import * as React from 'react';
import MockAdapter from 'axios-mock-adapter';
import client from '../../http/client';
import RegisterInput from './types/RegisterInput';
import * as faker from 'faker';
import { act } from 'react-dom/test-utils';
import { wait } from '../../../src/utils/timeout';

describe( 'RegisterForm component', () => {
    let mockAxios: MockAdapter;

    beforeEach( () => {
        mockAxios = new MockAdapter( client );
    } );

    it( 'renders without crashing', () => {
        mount( <RegisterForm/> );
    } );

    it( 'submit button should show loading icon and change label text on submit', async () => {
        mockAxios = new MockAdapter( client, {
            delayResponse: 5000,
        } );

        mockAxios
            .onPost( '/auth/register' )
            .replyOnce( 200, true );

        const password = faker.internet.password();

        const values: RegisterInput = {
            email: faker.internet.email(),
            password,
            passwordRepeat: password,
        };

        const component = mount( <RegisterForm initialValues={ values }/> );
        const form = component.find( '.register-form' ).at( 0 );

        act( () => {
            form.simulate( 'submit' );
        } );

        await wait( 10 );

        const submitBtn = component.update().find( '.submit-button' ).at( 0 );
        const label = submitBtn.find( '.loader-label' ).at( 0 );
        expect( label.text() ).toEqual( 'Registering...' );
    } );
} );
