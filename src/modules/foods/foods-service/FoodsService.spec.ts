import { Test, TestingModule } from '@nestjs/testing';
import { FoodsService } from './FoodsService';
import { getModelToken } from '@nestjs/mongoose';

describe( 'FoodsService', () => {
    let service: FoodsService;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule( {
                                                                          providers: [
                                                                              FoodsService,
                                                                              {
                                                                                  provide: getModelToken( 'Food' ),
                                                                                  useValue: jest.fn(),
                                                                              },
                                                                          ],
                                                                      } ).compile();

        service = module.get<FoodsService>( FoodsService );
    } );

    it( 'should be defined', () => {
        expect( service ).toBeDefined();
    } );
} );
