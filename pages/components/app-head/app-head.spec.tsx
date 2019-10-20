import { mount } from 'enzyme';
import AppHead from './app-head';
import * as React from 'react';

describe( 'AppHead component', () =>
{
    it( 'Renders without crashing', () =>
    {
        mount( <AppHead title="Test"/> );
    } );
} );
