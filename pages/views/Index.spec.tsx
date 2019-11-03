import Index from './Index';
import * as React from 'react';
import mountWithStore from '../test/mountWithStore';

jest.mock( '../http/redirect', () => ({
    default: jest.fn(),
}) );

describe( 'Index component', () =>
{
    beforeEach( () =>
    {
        jest.resetModules();
    } );

    it( 'renders without crashing', () =>
    {
        mountWithStore( <Index/>, {
            user: {
                userFetched: false,
            },
        } );
    } );
} );
