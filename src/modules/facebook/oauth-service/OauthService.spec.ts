import { Test, TestingModule } from '@nestjs/testing';
import OauthService from './OauthService';
import GraphClient from '../graph-client/GraphClient';
import axios from 'axios';
import { UsersService } from '../../users/users-service/UsersService';
import { getModelToken } from '@nestjs/mongoose';
import MockModel from '../../../test/mocks/models/MockModel';
import { AuthService } from '../../auth/auth-service/AuthService';
import { ConfigModule } from '../../config/ConfigModule';
import * as faker from 'faker';
import UserData from '../graph-client/types/UserData';
import User from '../../users/types/User';
import UserDocument from '../../users/types/UserDocument';

describe( 'OauthService', () =>
{
    let module: TestingModule;
    let service: OauthService;

    beforeEach( async () =>
    {
        module = await Test.createTestingModule( {
            imports: [ ConfigModule ],
            providers: [
                UsersService,
                AuthService,
                OauthService,
                {
                    provide: GraphClient,
                    useFactory: () =>
                    {
                        const client = axios.create();

                        return new GraphClient( client );
                    },
                },
                {
                    provide: getModelToken( 'User' ),
                    useValue: MockModel,
                },
                {
                    provide: getModelToken( 'PasswordReset' ),
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

    it( 'handleCode should return found user if it exists', async () =>
    {
        const code = faker.random.uuid();

        const userData: UserData = {
            id: faker.random.uuid(),
        };

        const mockUser: Partial<User> = {
            facebookID: userData.id,
        };

        const client = module.get( GraphClient );
        const clientSpy = jest.spyOn( client, 'getMe' );
        clientSpy.mockReturnValue(
            Promise.resolve( {
                data: userData,
            } as any ),
        );

        const usersService = module.get( UsersService );
        const usersSpy = jest.spyOn( usersService, 'getByFacebookID' );
        usersSpy.mockReturnValue( Promise.resolve( mockUser as UserDocument ) );

        const result = await service.handleCode( code );

        expect( clientSpy ).toBeCalledWith( code );
        expect( usersSpy ).toBeCalledWith( userData.id );
        expect( result ).toEqual( mockUser );
    } );

    it( 'handleCode should create new user if it does\'nt exist', async () =>
    {
        const code = faker.random.uuid();

        const userData: UserData = {
            id: faker.random.uuid(),
            email: faker.internet.email(),
        };

        const mockUser: Partial<User> = {
            facebookID: userData.id,
            email: userData.email,
        };

        const client = module.get( GraphClient );
        const clientSpy = jest.spyOn( client, 'getMe' );
        clientSpy.mockReturnValue(
            Promise.resolve( {
                data: userData,
            } as any ),
        );

        const usersService = module.get( UsersService );
        const getByFacebookIDSpy = jest.spyOn( usersService, 'getByFacebookID' );
        const createSpy = jest.spyOn( usersService, 'create' );

        getByFacebookIDSpy.mockReturnValue( Promise.resolve( undefined ) );
        createSpy.mockReturnValue( Promise.resolve( mockUser as UserDocument ) );

        const result = await service.handleCode( code );

        expect( clientSpy ).toBeCalledWith( code );
        expect( getByFacebookIDSpy ).toBeCalledWith( userData.id );
        expect( result ).toEqual( mockUser );

        const createCalls = createSpy.mock.calls;
        expect( createCalls[ 0 ][ 0 ] ).toEqual( userData.email );
    } );
} );
