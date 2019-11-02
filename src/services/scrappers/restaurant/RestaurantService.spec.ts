import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './RestaurantService';
import { PageLoaderService } from '../../page-loader/PageLoaderService';

describe( 'RestaurantService', () => {
    let service: RestaurantService;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule( {
                                                                          providers: [ RestaurantService, PageLoaderService ],
                                                                      } ).compile();

        service = module.get<RestaurantService>( RestaurantService );
    } );

    it( 'should be defined', () => {
        expect( service ).toBeDefined();
    } );
} );
