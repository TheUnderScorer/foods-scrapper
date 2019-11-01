import * as React from 'react';
import { FC } from 'react';
import useAuthGuard from './useAuthGuard';
import redirect from '../http/redirect';
import { act } from 'react-dom/test-utils';
import { wait } from '../../src/utils/timeout';
import mountWithStore from '../test/mountWithStore';
import { Routes } from '../http/types/Routes';

jest.mock( '../http/redirect', () => ( {
    default: jest.fn(),
} ) );

describe( 'useAuthGuard', () =>
{
    beforeEach( () =>
    {
        jest.resetModules();
    } );

    const MockComponent: FC = () =>
    {
        useAuthGuard();

        return null;
    };

    it( 'should redirect if user is not logged in', async () =>
    {
        const mockRedirect = redirect as jest.Mock;

        await act( async () =>
        {
            mountWithStore( <MockComponent/>, {
                user: {
                    userFetched: true,
                    currentUser: null,
                },
            } );

            await wait( 100 );
        } );

        expect( mockRedirect ).toBeCalledWith( Routes.login );
    } );
} );
