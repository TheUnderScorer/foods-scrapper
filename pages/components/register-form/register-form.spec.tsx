import { mount } from 'enzyme';
import RegisterForm from './register-form';
import * as React from 'react';

describe( 'RegisterForm component', () =>
{
    it( 'renders without crashing', () =>
    {
        mount( <RegisterForm/> );
    } );
} );
