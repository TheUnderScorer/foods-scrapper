import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { PageLoaderService } from '../../page-loader/page-loader.service';

describe( 'RestaurantService', () =>
{
    let service: RestaurantService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ RestaurantService, PageLoaderService ],
        } ).compile();

        service = module.get<RestaurantService>( RestaurantService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
