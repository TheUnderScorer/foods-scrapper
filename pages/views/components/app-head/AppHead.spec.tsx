import { mount } from 'enzyme';
import AppHead from './AppHead';
import * as React from 'react';

describe( 'AppHead component', () =>
{
    it( 'Renders without crashing', () =>
    {
        mount( <AppHead title="Test"/> );
    } );
} );
