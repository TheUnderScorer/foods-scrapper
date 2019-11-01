import { mount } from 'enzyme';
import SocialLogin from './SocialLogin';
import * as React from 'react';

describe( 'SocialLogin component', () =>
{
    it( 'renders without crashing', () =>
    {
        mount( <SocialLogin/> );
    } );

    it( 'should render google login if google ID is provided', () =>
    {
        const component = mount( <SocialLogin googleID="GOOGLE_ID"/> );
        const btn = component.find( '#google_login' ).at( 0 );

        expect( btn ).toHaveLength( 1 );
    } );
} );
