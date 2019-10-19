import { NotLoggedGuard } from './not-logged-guard.service';
import MockHttpArgumentHost from '../../../test/mocks/nest/MockHttpArgumentHost';
import MockContext from '../../../test/mocks/nest/MockContext';

describe( 'NotLoggedGuardGuard', () =>
{
    it( 'should be defined', () =>
    {
        expect( new NotLoggedGuard() ).toBeDefined();
    } );

    it( 'Should redirect to home if user is logged in ', () =>
    {
        const guard = new NotLoggedGuard();
        const request = {
            body: {
                user: true,
            },
        };
        const response = {
            redirect: jest.fn(),
        };

        const httpArg = new MockHttpArgumentHost( request, response );
        const mockContext = new MockContext( httpArg );

        guard.canActivate( mockContext as any );

        expect( response.redirect ).toBeCalledWith( '/' );
    } );
} );
