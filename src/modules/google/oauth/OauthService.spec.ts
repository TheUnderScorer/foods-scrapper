import { Test, TestingModule } from '@nestjs/testing';
import OauthService from './OauthService';

describe( 'OauthService', () =>
{
    let service: OauthService;
    let mockGoogleClient: any;

    beforeEach( async () =>
    {
        mockGoogleClient = {};

        const module: TestingModule = await Test.createTestingModule( {
            providers: [
                {
                    provide:    OauthService,
                    useFactory: () => new OauthService( mockGoogleClient as any ),
                },
            ],
        } ).compile();

        service = module.get<OauthService>( OauthService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'handleCode should create new user if no user with given ID is found', () =>
    {

    } );
} );
