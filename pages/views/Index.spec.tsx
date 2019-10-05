import { mount } from 'enzyme';
import Index from './Index';
import * as React from 'react';

describe( 'Index component', () =>
{
    it( 'Renders without crashing', () =>
    {
        mount( <Index/> );
    } );
} );
