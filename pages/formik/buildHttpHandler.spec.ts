import buildHttpHandler from './buildHttpHandler';

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

        const setStatus = jest.fn();
        const requestHandler = () =>
        {
            return Promise.reject( {
                response,
            } );
        };

        const httpHandler = buildHttpHandler( setStatus );
        const { isEmpty } = await httpHandler( requestHandler );

        expect( setStatus ).toBeCalledWith( {
            error:   true,
            message: response.data.message,
        } );
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
