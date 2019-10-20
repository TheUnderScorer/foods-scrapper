import buildHttpHandler from './build-http-handler';

describe( 'buildHttpHandler', () =>
{
    it( 'should handle errors', async () =>
    {
        const response = {
            data: {
                error:   true,
                message: 'Error',
            },
        };

        const setError = jest.fn();
        const requestHandler = () =>
        {
            return Promise.reject( {
                response,
            } );
        };

        const httpHandler = buildHttpHandler( setError );
        const { isEmpty } = await httpHandler( requestHandler );

        expect( setError ).toBeCalledWith( response.data.message );
        expect( isEmpty() ).toBeTruthy();
    } );

    it( 'should return correct result', async () =>
    {
        const result = {
            result: true,
        };
        const httpHandler = buildHttpHandler( jest.fn() );
        const { response, isEmpty } = await httpHandler( async () => ( {
            data: result,
        } ) as any );

        expect( isEmpty() ).toBeFalsy();
        expect( response.data ).toEqual( result );
    } );
} );
