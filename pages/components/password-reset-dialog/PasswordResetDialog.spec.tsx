import { mount } from 'enzyme';
import * as React from 'react';
import PasswordResetDialog from './PasswordResetDialog';

describe( 'PasswordResetDialog', () =>
{
    it( 'renders without crashing', () =>
    {
        mount( <PasswordResetDialog onClose={ jest.fn() }/> );
    } );
} );
