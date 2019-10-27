import { Test, TestingModule } from '@nestjs/testing';
import { EmailTypesService } from './EmailTypesService';

describe( 'EmailTypesService', () =>
{
    let service: EmailTypesService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ EmailTypesService ],
        } ).compile();

        service = module.get<EmailTypesService>( EmailTypesService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
