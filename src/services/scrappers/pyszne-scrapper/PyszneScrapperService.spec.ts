import { Test, TestingModule } from '@nestjs/testing';
import { PyszneScrapperService } from './PyszneScrapperService';
import PageMock from '../../../test/mocks/puppeteer/page-mock';
import { PageLoaderService } from '../../page-loader/PageLoaderService';
import { MealsListService } from '../meals-list/MealsListService';
import { RestaurantService } from '../restaurant/RestaurantService';

describe( 'PyszneScrapperService', () =>
{
    let service: PyszneScrapperService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ PyszneScrapperService, PageLoaderService, MealsListService, RestaurantService ],
        } ).compile();

        service = await module.resolve<PyszneScrapperService>( PyszneScrapperService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'handles location', async () =>
    {
        const mockPage = new PageMock();
        await service.handleLocation( mockPage as any, 'test' );

        expect( mockPage.typedValues ).toContainEqual( {
            selector: '#imysearchstring',
            value:    'test',
        } );
        expect( mockPage.waitedSelectors ).toContain( '.lp__place' );
        expect( mockPage.clickedSelectors ).toContain( '.lp__place' );
        expect( mockPage.waitedSelectors ).toContain( service.selectors.restaurantName );
    } );
} );
