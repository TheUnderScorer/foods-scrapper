import * as React from 'react';
import { FC } from 'react';
import redirect from '../http/redirect';
import { act } from 'react-dom/test-utils';
import { wait } from '../../src/utils/timeout';
import mountWithStore from '../test/mountWithStore';
import { Routes } from '../http/types/Routes';
import useNotLoggedGuard from './useNotLoggedGuard';

jest.mock( '../http/redirect', () => ({
    default: jest.fn(),
}) );

describe( 'useNotLoggedGuard', () => {
    beforeEach( () => {
        jest.resetModules();
    } );

    const MockComponent: FC = () => {
        useNotLoggedGuard();

        return null;
    };

    it( 'should redirect if user is logged in', async () => {
        const mockRedirect = redirect as jest.Mock;

        await act( async () => {
            mountWithStore( <MockComponent/>, {
                                                  user: {
                                                      userFetched: true,
                                                      currentUser: {
                                                          _id: '1',
                                                      },
                                                  },
                                              } );

            await wait( 100 );
        } );

        expect( mockRedirect ).toBeCalledWith( Routes.home );
    } );
} );
