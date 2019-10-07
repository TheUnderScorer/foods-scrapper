import { mount } from 'enzyme';
import LoginPage from './Login';
import * as React from 'react';

describe( 'Login component', () =>
{
    it( 'Renders without crashing', () =>
    {
        mount( <LoginPage/> );
    } );
} );
