import { Test, TestingModule } from '@nestjs/testing';
import FacebookAuthController from './FacebookAuthController';
import OauthService from './oauth-service/OauthService';
import GraphClient from './graph-client/GraphClient';
import axios from 'axios';
import { UsersService } from '../users/users-service/UsersService';
import { AuthService } from '../auth/auth-service/AuthService';
import { getModelToken } from '@nestjs/mongoose';
import MockModel from '../../test/mocks/models/MockModel';
import { ConfigModule } from '../config/ConfigModule';
import * as faker from 'faker';
import User from '../users/types/User';
import UserDocument from '../users/types/UserDocument';

describe( 'FacebookAuth Controller', () =>
{
    let module: TestingModule;
    let controller: FacebookAuthController;

    beforeEach( async () =>
    {
        module = await Test.createTestingModule( {
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
            exports: [ OauthService ],
            imports: [ ConfigModule ],
            controllers: [ FacebookAuthController ],
        } ).compile();

        controller = module.get<FacebookAuthController>( FacebookAuthController );
    } );

    it( 'should be defined', () =>
    {
        expect( controller ).toBeDefined();
    } );

    it( 'handleLogin', async () =>
    {
        const user: Partial<User> = {
            _id: '1',
        };

        const token = faker.random.uuid();

        const oauth = module.get( OauthService );
        const handleCodeSpy = jest.spyOn( oauth, 'handleCode' );

        const auth = module.get( AuthService );
        const loginSpy = jest.spyOn( auth, 'login' );

        loginSpy.mockReturnValue( Promise.resolve( faker.random.uuid() ) );
        handleCodeSpy.mockReturnValue( Promise.resolve( user as UserDocument ) );

        const response = {
            json: jest.fn(),
        };

        await controller.handleLogin( { token }, response as any );

        expect( handleCodeSpy ).toBeCalledWith( token );
        expect( loginSpy ).toBeCalledWith( user, response );
        expect( response.json ).toBeCalledWith( {
            result: user,
        } );
    } );
} );
