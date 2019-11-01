import { Test, TestingModule } from '@nestjs/testing';
import OauthService from './OauthService';
import { UsersService } from '../../users/users-service/UsersService';

describe( 'OauthService', () =>
{
    let service: OauthService;
    let mockGoogleClient: any;

    beforeEach( async () =>
    {
        mockGoogleClient = {};

        const module: TestingModule = await Test.createTestingModule( {
            imports:   [ UsersService ],
            providers: [
                {
                    provide:    OauthService,
                    useFactory: ( usersService: UsersService ) => new OauthService( mockGoogleClient as any, usersService ),
                    inject:     [ UsersService ],
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
