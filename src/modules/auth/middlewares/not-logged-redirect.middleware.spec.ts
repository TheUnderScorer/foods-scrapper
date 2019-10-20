import { NotLoggedRedirectMiddleware } from './not-logged-redirect.middleware';

describe( 'NotLoggedRedirectMiddleware', () =>
{
    it( 'should be defined', () =>
    {
        expect( new NotLoggedRedirectMiddleware() ).toBeDefined();
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

        const middleware = new NotLoggedRedirectMiddleware();

        middleware.use( request as any, response as any, next );

        expect( response.redirect ).toBeCalledWith( '/auth/login' );
        expect( next ).toBeCalledTimes( 0 );
    } );
} );
