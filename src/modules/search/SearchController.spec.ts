import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './SearchController';
import { getModelToken } from '@nestjs/mongoose';
import { SearchService } from './search-service/SearchService';

describe( 'Search Controller', () => {
    let controller: SearchController;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule( {
                                                                          controllers: [ SearchController ],
                                                                          providers: [
                                                                              SearchService,
                                                                              {
                                                                                  provide: getModelToken( 'Food' ),
                                                                                  useValue: jest.fn(),
                                                                              },
                                                                              {
                                                                                  provide: getModelToken( 'Search' ),
                                                                                  useValue: jest.fn(),
                                                                              },
                                                                          ],
                                                                      } ).compile();

        controller = module.get<SearchController>( SearchController );
    } );

    it( 'should be defined', () => {
        expect( controller ).toBeDefined();
    } );
} );
