import { Test, TestingModule } from '@nestjs/testing';
import EmailService from './EmailService';
import { ConfigService } from '../../config/config-service/ConfigService';

describe( 'EmailService', () =>
{
    let service: EmailService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ EmailService, ConfigService ],
        } ).compile();

        service = module.get<EmailService>( EmailService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
