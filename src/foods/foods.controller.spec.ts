import { Test, TestingModule } from '@nestjs/testing';
import { FoodsController } from './foods.controller';
import { PyszneScrapperService } from '../scrappers/pyszne-scrapper/pyszne-scrapper.service';
import { Food } from './interfaces/food.interface';

describe( 'Foods Controller', () =>
{
    let controller: FoodsController;
    let pyszneService: PyszneScrapperService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            controllers: [ FoodsController ],
            providers:   [ PyszneScrapperService ],
        } ).compile();

        controller = module.get<FoodsController>( FoodsController );
        pyszneService = module.get<PyszneScrapperService>( PyszneScrapperService );
    } );

    it( 'should be defined', () =>
    {
        expect( controller ).toBeDefined();
    } );

    it( 'Should return list of foods from given services', async () =>
    {
        const foods: Food[] = [
            {
                name:  'test',
                price: 25,
                url:   '',
            },
        ];

        jest
            .spyOn( pyszneService, 'execute' )
            .mockImplementation( ( keywords: string[] ) => Promise.resolve( [
                {
                    name:  keywords[ 0 ],
                    price: 25,
                    url:   '',
                },
            ] ) );

        const result = await controller.getFoods( {
            services: [ 'pyszne' ],
            keywords: [ 'test' ],
        } );

        expect( result.result ).toEqual( foods );
    } );
} );
