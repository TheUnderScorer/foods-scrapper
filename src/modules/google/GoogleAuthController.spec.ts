import { Test, TestingModule } from '@nestjs/testing';
import GoogleAuthController from './GoogleAuthController';
import OauthService from './oauth-service/OauthService';
import User from '../users/types/User';
import * as faker from 'faker';
import UserDocument from '../users/types/UserDocument';
import { UsersService } from '../users/users-service/UsersService';
import { ConfigModule } from '../config/ConfigModule';
import { getModelToken } from '@nestjs/mongoose';
import MockModel from '../../test/mocks/models/MockModel';
import { AuthService } from '../auth/auth-service/AuthService';

describe( 'Google Controller', () =>
{
    let controller: GoogleAuthController;
    let module: TestingModule;

    beforeEach( async () =>
    {
        module = await Test.createTestingModule( {
            controllers: [ GoogleAuthController ],
            imports: [ ConfigModule ],
            providers: [
                UsersService,
                AuthService,
                {
                    provide: OauthService,
                    useFactory: ( usersService: UsersService ) => new OauthService( {} as any, {} as any, usersService ),
                    inject: [ UsersService ],
                },
                {
                    provide: getModelToken( 'PasswordReset' ),
                    useValue: MockModel,
                },
                {
                    provide: getModelToken( 'User' ),
                    useValue: MockModel,
                },
            ],
        } ).compile();

        controller = module.get<GoogleAuthController>( GoogleAuthController );
    } );

    it( 'should be defined', () =>
    {
        expect( controller ).toBeDefined();
    } );

    it( 'handleLogin', async () =>
    {
        const authService = module.get( AuthService );
        const authSpy = jest.spyOn( authService, 'login' );
        authSpy.mockReturnValue( Promise.resolve( faker.random.uuid() ) );

        const mockUser: Partial<User> = {
            _id: '1',
        };

        const code = faker.random.uuid();

        const service = module.get( OauthService );
        const spy = jest.spyOn( service, 'handleCode' );
        spy.mockReturnValue( Promise.resolve( mockUser as UserDocument ) );

        const response = {
            json: jest.fn(),
        };

        await controller.handleLogin( { code }, response as any );

        expect( spy ).toBeCalledWith( code );
        expect( response.json ).toBeCalledWith( {
            result: mockUser,
        } );
        expect( authSpy ).toBeCalledWith( mockUser, response );
    } );
} );
