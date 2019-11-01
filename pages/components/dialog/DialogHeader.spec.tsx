import { mount } from 'enzyme';
import DialogHeader from './DialogHeader';
import * as React from 'react';

describe( 'DialogHeader', () =>
{
    it( 'renders without crashing', () =>
    {
        mount( <DialogHeader/> );
    } );

    it( 'should display icon', () =>
    {
        const component = mount( <DialogHeader icon={ <span className="icon">icon</span> }/> );

        const title = component.find( '.title-with-icon' ).at( 0 );
        const icon = component.find( '.icon' ).at( 0 );

        expect( title ).toHaveLength( 1 );
        expect( icon ).toHaveLength( 1 );
    } );
} );
