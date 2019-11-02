import { mount } from 'enzyme';
import CardPage from './CardPage';
import * as React from 'react';

describe( 'CardPage component', () =>
{
    it( 'Renders without crashing with given props', () =>
    {
        const component = mount( <CardPage returnUrl="/" title="Test title"/> );
        const title = component.find( '.card-title' ).at( 0 );
        const returnLink = component.find( '.return-link' ).at( 0 );

        expect( title.text() ).toEqual( 'Test title' );
        expect( returnLink.props().href ).toEqual( '/' );
    } );
} );
