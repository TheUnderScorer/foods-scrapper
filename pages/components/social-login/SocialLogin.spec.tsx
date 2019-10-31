import { mount } from 'enzyme';
import SocialLogin from './SocialLogin';
import * as React from 'react';

describe( 'SocialLogin component', () =>
{
    it( 'renders without crashing', () =>
    {
        mount( <SocialLogin/> );
    } );
} );
