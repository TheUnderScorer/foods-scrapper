import Register from './Register';
import * as React from 'react';
import mountWithStore from '../test/mountWithStore';

describe( 'Register component', () => {
    it( 'Renders without crashing', () => {
        mountWithStore( <Register/>, {
                                         user: {
                                             userFetched: false,
                                             currentUser: null,
                                         },
                                     } );
    } );
} );
