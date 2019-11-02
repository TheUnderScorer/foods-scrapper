import { NotLoggedRedirect } from './NotLoggedRedirect';

describe( 'NotLoggedRedirectMiddleware', () =>
{
    it( 'should be defined', () =>
    {
        expect( new NotLoggedRedirect() ).toBeDefined();
    } );

    it( 'Should redirect to login page if user is not logged in ', () =>
    {
        const request = {
            body: {
                user: false,
            },
        };
        const response = {
            redirect: jest.fn(),
        };
        const next = jest.fn();

        const middleware = new NotLoggedRedirect();

        middleware.use( request as any, response as any, next );

        expect( response.redirect ).toBeCalledWith( '/auth/login' );
        expect( next ).toBeCalledTimes( 0 );
    } );
} );
