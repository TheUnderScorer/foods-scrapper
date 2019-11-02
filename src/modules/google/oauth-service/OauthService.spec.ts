import { Test, TestingModule } from '@nestjs/testing';
import OauthService from './OauthService';
import { UsersService } from '../../users/users-service/UsersService';
import * as faker from 'faker';
import User from '../../users/types/User';
import UserDocument from '../../users/types/UserDocument';
import { getModelToken } from '@nestjs/mongoose';
import MockModel from '../../../test/mocks/models/MockModel';
import { ConfigModule } from '../../config/ConfigModule';

describe( 'OauthService', () => {
    let service: OauthService;
    let module: TestingModule;
    let mockGoogleClient: any;
    let mockUser: Partial<User>;

    beforeEach( async () => {
        mockGoogleClient = {
            getToken: jest.fn(),
        };

        mockUser = {
            _id: '1',
        };

        module = await Test.createTestingModule( {
                                                     imports: [ ConfigModule ],
                                                     providers: [
                                                         UsersService,
                                                         {
                                                             provide: OauthService,
                                                             useFactory: ( usersService: UsersService ) => new OauthService( mockGoogleClient as any, usersService ),
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

    it( 'should be defined', () => {
        expect( service ).toBeDefined();
    } );

    it( 'handleCode should search for user with given googleID', async () => {
        const idToken = faker.random.uuid();
        mockGoogleClient.getToken.mockReturnValue( Promise.resolve( {
                                                                        tokens: {
                                                                            // eslint-disable-next-line @typescript-eslint/camelcase
                                                                            id_token: idToken,
                                                                        },
                                                                    } ) );

        const code = faker.random.uuid();

        const usersService = module.get( UsersService );
        const spy = jest.spyOn( usersService, 'getByGoogleID' );
        spy.mockReturnValue( Promise.resolve( mockUser as UserDocument ) );

        const result = await service.handleCode( code );

        expect( result ).toEqual( mockUser );
        expect( spy ).toBeCalledWith( idToken );
        expect( mockGoogleClient.getToken ).toBeCalledWith( code );
    } );
} );
