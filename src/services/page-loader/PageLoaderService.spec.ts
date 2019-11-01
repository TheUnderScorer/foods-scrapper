import { Test, TestingModule } from '@nestjs/testing';
import { PageLoaderService } from './PageLoaderService';
import { HttpModule } from '@nestjs/common';

describe( 'PageLoaderService', () =>
{
    let service: PageLoaderService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ PageLoaderService ],
            imports:   [ HttpModule ],
        } ).compile();

        service = module.get<PageLoaderService>( PageLoaderService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
