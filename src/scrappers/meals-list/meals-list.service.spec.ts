import { Test, TestingModule } from '@nestjs/testing';
import { MealsListService } from './meals-list.service';
import PageMock from '../../test/mocks/puppeteer/page-mock';
import { ScrapperSelectors } from '../interfaces/scrapper-selectors.interface';
import * as faker from 'faker';
import Restaurant from '../interfaces/restaurant.interface';
import selectorToClassName from '../../selectors/selectorToClassName';

describe( 'MealsListService', () =>
{
    let service: MealsListService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ MealsListService ],
        } ).compile();

        service = module.get<MealsListService>( MealsListService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'should return meals list basing', async () =>
    {
        const mockPage = new PageMock();
        const items: Restaurant[] = [
            {
                name: faker.random.word(),
                link: faker.internet.url(),
            },
            {
                name: faker.random.word(),
                link: faker.internet.url(),
            },
            {
                name: faker.random.word(),
                link: faker.internet.url(),
            },
        ];

        const selectors: ScrapperSelectors = {
            mealAdditionalInfo: '.meal__description-additional-info',
            mealDescription:    '.meal__description-choose-from',
            mealName:           '.meal-name',
            mealPrice:          '.meal__price',
            restaurantMenuItem: '.restaurant',
            restaurantMenuLink: '.restaurant-link',
            restaurantName:     '.restaurant-name',
            mealWrapper:        '.meal-container',
        };

        mockPage.on( 'document.setup', ( document: Document ) =>
        {
            items.forEach( ( { name, link } ) =>
            {
                const wrapper = document.createElement( 'div' );
                wrapper.classList.add( selectorToClassName( selectors.restaurantMenuItem ) );

                const linkEl = document.createElement( 'a' );
                linkEl.classList.add( selectorToClassName( selectors.restaurantMenuLink ) );

                const nameEl = document.createElement( 'span' );
                nameEl.classList.add( selectorToClassName( selectors.restaurantName ) );

                linkEl.setAttribute( 'href', link );
                nameEl.textContent = name;

                wrapper.appendChild( linkEl );
                wrapper.appendChild( nameEl );

                document.body.appendChild( wrapper );
            } );
        } );

        const result = await service.gatherMealsList( mockPage as any, selectors );

        expect( result ).toEqual( items );
    } );
} );
