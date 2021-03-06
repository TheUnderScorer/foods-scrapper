import { Test, TestingModule } from '@nestjs/testing';
import EmailService from './EmailService';
import { ConfigModule } from '../../config/ConfigModule';

describe( 'EmailService', () =>
{
    let service: EmailService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ EmailService ],
            imports: [ ConfigModule ],
        } ).compile();

        service = module.get<EmailService>( EmailService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
