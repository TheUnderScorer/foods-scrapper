import { Test, TestingModule } from '@nestjs/testing';
import OauthService from './OauthService';
import { UsersService } from '../../users/users-service/UsersService';
import * as faker from 'faker';
import User from '../../users/types/User';
import UserDocument from '../../users/types/UserDocument';
import { getModelToken } from '@nestjs/mongoose';
import MockModel from '../../../test/mocks/models/MockModel';
import { ConfigModule } from '../../config/ConfigModule';

describe( 'OauthService', () =>
{
    let service: OauthService;
    let module: TestingModule;
    let mockGoogleClient: any;
    let mockOAuth: any;
    let mockUser: Partial<User>;

    beforeEach( async () =>
    {
        mockGoogleClient = {
            getToken: jest.fn(),
            setCredentials: jest.fn(),
        };

        mockOAuth = {
            userinfo: {
                get: jest.fn(),
            },
        };

        mockUser = {
            _id: '1',
            email: faker.internet.email(),
        };

        module = await Test.createTestingModule( {
            imports: [ ConfigModule ],
            providers: [
                UsersService,
                {
                    provide: OauthService,
                    useFactory: ( usersService: UsersService ) => new OauthService( mockGoogleClient as any, mockOAuth as any, usersService ),
                    inject: [ UsersService ],
                },
                {
                    provide: getModelToken( 'User' ),
                    useValue: MockModel,
                },
            ],
        } ).compile();

        service = module.get<OauthService>( OauthService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'handleCode should search for user with given googleID', async () =>
    {
        const idToken = faker.random.uuid();
        const getTokenResponse = {
            tokens: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                id_token: idToken,
            },
        };
        mockGoogleClient.getToken.mockReturnValue( Promise.resolve( getTokenResponse ) );

        const userGoogleId = faker.random.uuid();
        mockOAuth.userinfo.get.mockReturnValue( Promise.resolve( {
            data: {
                email: mockUser.email,
                id: userGoogleId,
            },
        } ) );

        const code = faker.random.uuid();

        const usersService = module.get( UsersService );
        const usersServiceSpy = jest.spyOn( usersService, 'getByGoogleID' );
        usersServiceSpy.mockReturnValue( Promise.resolve( mockUser as UserDocument ) );

        const result = await service.handleCode( code );

        expect( result ).toEqual( mockUser );
        expect( usersServiceSpy ).toBeCalledWith( userGoogleId );
        expect( mockGoogleClient.getToken ).toBeCalledWith( code );
        expect( mockGoogleClient.setCredentials ).toBeCalledWith( getTokenResponse.tokens );
        expect( mockOAuth.userinfo.get ).toBeCalledTimes( 1 );
    } );
} );
