import { Test, TestingModule } from '@nestjs/testing';
import { FoodsController } from './FoodsController';
import { PyszneScrapperService } from '../../services/scrappers/pyszne-scrapper/PyszneScrapperService';
import { PageLoaderService } from '../../services/page-loader/PageLoaderService';
import { MealsListService } from '../../services/scrappers/meals-list/MealsListService';
import { RestaurantService } from '../../services/scrappers/restaurant/RestaurantService';
import { SearchService } from '../search/search-service/search.service';
import { FoodsService } from './foods-service/FoodsService';
import Search, { SearchStatus } from '../search/types/Search';
import { Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import User from '../users/types/User';

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
        const user: Partial<User> = {
            _id: '1',
        };

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

        const { result } = await controller.getFoods(
            {
                services: [ 'pyszne' ],
                keywords: [ 'test' ],
                location: 'Katowice',
            },
            {
                user,
            } as any,
        );

        expect( result.status ).toEqual( SearchStatus.Pending );
        expect( result.searchID ).toEqual( searchID );

        setTimeout( () =>
        {
            expect( search.status ).toEqual( SearchStatus.Done );

            done();
        }, 1000 );
    } );
} );
