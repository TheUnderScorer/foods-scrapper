import { Test, TestingModule } from '@nestjs/testing';
import GraphClient from './GraphClient';

describe( 'GraphClientService', () =>
{
    let service: GraphClient;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ GraphClient ],
        } ).compile();

        service = module.get<GraphClient>( GraphClient );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
