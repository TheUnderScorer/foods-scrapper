import GraphClient from './GraphClient';
import * as faker from 'faker';

describe( 'GraphClientService', () =>
{
    let service: GraphClient;
    let mockAxios: any;

    beforeEach( async () =>
    {
        mockAxios = {
            get: jest.fn(),
        };

        service = new GraphClient( mockAxios as any );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'getMe', async () =>
    {
        const token = faker.random.uuid();
        const fields = [ 'email' ];

        await service.getMe( token, fields );

        expect( mockAxios.get ).toBeCalledWith( '/me', {
            params: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                access_token: token,
                fields: fields.join( ',' ),
            },
        } );
    } );
} );
