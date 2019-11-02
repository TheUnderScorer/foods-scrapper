import { NotLoggedGuard } from './NotLoggedGuard';
import MockHttpArgumentHost from '../../../test/mocks/nest/MockHttpArgumentHost';
import MockContext from '../../../test/mocks/nest/MockContext';

describe( 'NotLoggedGuardGuard', () => {
    it( 'should be defined', () => {
        expect( new NotLoggedGuard() ).toBeDefined();
    } );

    it( 'Should redirect to home if user is logged in ', async () => {
        const guard = new NotLoggedGuard();
        const request = {
            cookies: {
                jwt: true,
            },
        };

        const httpArg = new MockHttpArgumentHost( request );
        const mockContext = new MockContext( httpArg );

        const result = await guard.canActivate( mockContext as any );

        expect( result ).toBeFalsy();
    } );
} );
