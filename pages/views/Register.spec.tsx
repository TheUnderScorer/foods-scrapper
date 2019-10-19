import { mount } from 'enzyme';
import Register from './Register';
import * as React from 'react';

describe( 'Register component', () =>
{
    it( 'Renders without crashing', () =>
    {
        mount( <Register/> );
    } );
} );
