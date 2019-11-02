import { Test, TestingModule } from '@nestjs/testing';
import { EmailTypesService } from './EmailTypesService';
import EmailService from '../email-service/EmailService';
import { ConfigModule } from '../../config/ConfigModule';

describe( 'EmailTypesService', () =>
{
    let service: EmailTypesService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [ EmailTypesService, EmailService ],
            imports: [ ConfigModule ],
        } ).compile();

        service = module.get<EmailTypesService>( EmailTypesService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
