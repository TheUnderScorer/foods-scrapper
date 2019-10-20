import { mount } from 'enzyme';
import AuthPage from './auth-page';
import * as React from 'react';

describe( 'AuthPage component', () =>
{
    it( 'Renders without crashing with given props', () =>
    {
        const component = mount( <AuthPage returnUrl="/" title="Test title"/> );
        const title = component.find( '.card-title' ).at( 0 );
        const returnLink = component.find( '.return-link' ).at( 0 );

        expect( title.text() ).toEqual( 'Test title' );
        expect( returnLink.props().href ).toEqual( '/' );
    } );
} );
