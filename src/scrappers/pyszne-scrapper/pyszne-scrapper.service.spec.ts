import { Test, TestingModule } from '@nestjs/testing';
import { PyszneScrapperService } from './pyszne-scrapper.service';
import PageMock from '../../test/mocks/puppeteer/page-mock';
import { PageLoaderService } from '../../page-loader/page-loader.service';

describe( 'PyszneScrapperService', () =>
{
    let service: PyszneScrapperService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ PyszneScrapperService, PageLoaderService ],
        } ).compile();

        service = module.get<PyszneScrapperService>( PyszneScrapperService );
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
        expect( mockPage.didWaits ).toContain( 1500 );
    } );
} );
