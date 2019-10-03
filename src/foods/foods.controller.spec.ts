import { Test, TestingModule } from '@nestjs/testing';
import { FoodsController } from './foods.controller';
import { PyszneScrapperService } from '../scrappers/pyszne-scrapper/pyszne-scrapper.service';
import { PageLoaderService } from '../page-loader/page-loader.service';
import { MealsListService } from '../scrappers/meals-list/meals-list.service';
import { RestaurantService } from '../scrappers/restaurant/restaurant.service';
import { SearchService } from '../search/search-service/search.service';
import { FoodsService } from './foods-service/foods.service';
import Search, { SearchStatus } from '../search/interfaces/search.interface';
import { Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe( 'Foods Controller', () =>
{
    let controller: FoodsController;
    let pyszneService: PyszneScrapperService;
    let searchService: SearchService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            controllers: [ FoodsController ],
            providers:   [
                PyszneScrapperService,
                PageLoaderService,
                MealsListService,
                RestaurantService,
                FoodsService,
                SearchService,
                {
                    provide:  getModelToken( 'Food' ),
                    useValue: jest.fn(),
                },
                {
                    provide:  getModelToken( 'Search' ),
                    useValue: jest.fn(),
                },
            ],
        } ).compile();

        pyszneService = await module.resolve<PyszneScrapperService>( PyszneScrapperService );
        searchService = module.get<SearchService>( SearchService );
        controller = new FoodsController( pyszneService, searchService );
    } );

    it( 'should be defined', () =>
    {
        expect( controller ).toBeDefined();
    } );

    it( 'Should return ID of pending search and handle search in background', async ( done ) =>
    {
        const searchID = new Types.ObjectId();

        let search: Search;

        jest
            .spyOn( pyszneService, 'execute' )
            .mockImplementation( ( keywords: string[] ) =>
            {
                return new Promise( resolve =>
                {
                    setTimeout( () =>
                    {
                        resolve( [
                            {
                                name:  keywords[ 0 ],
                                price: 25,
                                url:   '',
                            },
                        ] );
                    }, 500 );
                } );
            } );

        jest
            .spyOn( searchService, 'create' )
            .mockImplementation( async ( searchData: Search ) =>
            {
                const result: any = {
                    ...searchData,
                    searchID,
                    toJSON()
                    {
                        return this;
                    },
                    async updateOne( data: any )
                    {
                        Object.assign( this, data );

                        return data;
                    },
                };

                search = result;

                return result;
            } );

        const { result } = await controller.getFoods( {
            services: [ 'pyszne' ],
            keywords: [ 'test' ],
            location: 'Katowice',
        } );

        expect( result.status ).toEqual( SearchStatus.Pending );
        expect( result.searchID ).toEqual( searchID );

        setTimeout( () =>
        {
            expect( search.status ).toEqual( SearchStatus.Done );

            done();
        }, 1000 );
    } );
} );
