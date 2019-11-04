import { mount } from 'enzyme';
import ScrapperForm from './ScrapperForm';
import * as React from 'react';

describe( 'ScrapperForm', () =>
{
    it( 'renders without crashing', () =>
    {
        mount( <ScrapperForm/> );
    } );
} );