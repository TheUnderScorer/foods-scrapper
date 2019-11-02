import SocialLogin from './SocialLogin';
import * as React from 'react';
import mountWithStore from '../../../test/mountWithStore';

describe( 'SocialLogin component', () =>
{
    it( 'renders without crashing', () =>
    {
        mountWithStore( <SocialLogin onError={ jest.fn() }/>, {} );
    } );

    it( 'should render google login if google ID is provided', () =>
    {
        const { component } = mountWithStore( <SocialLogin onError={ jest.fn() } googleID="GOOGLE_ID"/>, {} );
        const btn = component.find( '#google_login' ).at( 0 );

        expect( btn ).toHaveLength( 1 );
    } );
} );
