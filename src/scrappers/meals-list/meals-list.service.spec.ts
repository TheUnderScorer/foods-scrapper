import { Test, TestingModule } from '@nestjs/testing';
import { MealsListService } from './meals-list.service';

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
} );
