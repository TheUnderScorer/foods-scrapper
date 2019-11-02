import ErrorDialog from './ErrorDialog';
import * as React from 'react';
import mountWithStore from '../../test/mountWithStore';
import { act } from 'react-dom/test-utils';
import reloadPage from '../../http/reloadPage';

jest.mock( '../../http/reloadPage', () => ({
    default: jest.fn(),
}) );

describe( 'ErrorDialog', () => {
    const error = new Error( 'Test error' );
    error.name = 'test';

    it( 'renders without crashing', () => {
        mountWithStore( <ErrorDialog/>, {
                                            error: {
                                                error: null,
                                            },
                                        } );
    } );

    it( 'should display error message and name', () => {
        const { component } = mountWithStore( <ErrorDialog/>, {
                                                                  error: {
                                                                      error,
                                                                  },
                                                              } );

        const errorMessage = component.find( '.error-message' ).at( 0 );
        const errorName = component.find( '.error-name' ).at( 0 );

        expect( errorMessage.text() ).toEqual( error.message );
        expect( errorName.text() ).toEqual( error.name );
    } );

    it( 'clicking Reload Page button should reload page', () => {
        const mockReload = reloadPage as jest.Mock;

        const { component } = mountWithStore( <ErrorDialog/>, {
                                                                  error: {
                                                                      error,
                                                                  },
                                                              } );

        const reloadBtn = component.find( '.reload-btn' ).at( 0 );

        act( () => {
            reloadBtn.simulate( 'click' );
        } );

        expect( mockReload ).toBeCalledTimes( 1 );
    } );
} );
