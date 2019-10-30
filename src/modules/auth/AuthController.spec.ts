import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './AuthController';
import { AuthService } from './auth-service/AuthService';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users-service/UsersService';
import { ConfigModule } from '../config/ConfigModule';
import * as faker from 'faker';
import UserDto from './dto/UserDto';
import User from '../users/types/User';
import MockModel from '../../test/mocks/models/MockModel';
import UserDocument from '../users/types/UserDocument';
import PasswordResetService from './password-reset-service/PasswordResetService';
import PasswordReset from './types/PasswordReset';
import PasswordResetDocument from './types/PasswordResetDocument';
import EmailModule from '../email/EmailModule';
import PasswordResetDto from './dto/PasswordResetDto';

describe( 'Auth Controller', () =>
{
    let controller: AuthController;
    let module: TestingModule;

    beforeEach( async () =>
    {
        module = await Test.createTestingModule( {
            controllers: [ AuthController ],
            providers:   [
                PasswordResetService,
                AuthService,
                UsersService,
                {
                    provide:  getModelToken( 'User' ),
                    useValue: MockModel,
                },
                {
                    provide:  getModelToken( 'PasswordReset' ),
                    useValue: MockModel,
                },
            ],
            imports:     [ ConfigModule, EmailModule ],
        } ).compile();

        controller = module.get<AuthController>( AuthController );
    } );

    it( 'should be defined', () =>
    {
        expect( controller ).toBeDefined();
    } );

    it( 'login', async () =>
    {
        const jwt = faker.random.uuid();
        const authService = module.get( AuthService );

        const spy = jest.spyOn( authService, 'login' );
        spy.mockReturnValue( Promise.resolve( jwt ) );

        const request = {
            user: {
                _id: '1',
            },
        };

        const response = {
            json: jest.fn(),
        };

        await controller.login( request as any, response as any );

        expect( response.json ).toBeCalledWith( {
            result: {
                jwt,
            },
        } );

        expect( spy ).toBeCalledWith( request.user, response );
    } );

    it( 'getLoginPage', () =>
    {
        const response = {
            render: jest.fn(),
        };

        controller.getLoginPage( response as any );

        expect( response.render ).toBeCalledWith( 'Login' );
    } );

    it( 'getRegisterPage', () =>
    {
        const response = {
            render: jest.fn(),
        };

        controller.getRegisterPage( response as any );

        expect( response.render ).toBeCalledWith( 'Register' );
    } );

    it( 'register', async () =>
    {
        const jwt = faker.random.uuid();
        const user: Partial<User> = {
            _id: '1',
        };

        const usersService = module.get( UsersService );
        const authService = module.get( AuthService );

        const authSpy = jest.spyOn( authService, 'login' );
        const userSpy = jest.spyOn( usersService, 'create' );

        authSpy.mockReturnValue( Promise.resolve( jwt ) );
        userSpy.mockReturnValue( Promise.resolve( user as UserDocument ) );

        const dto: UserDto = {
            email:    faker.internet.email(),
            password: faker.internet.password(),
        };

        const response = {
            json: jest.fn(),
        };

        await controller.register( dto, response as any );

        expect( userSpy ).toBeCalledWith( dto.email, dto.password );
        expect( authSpy ).toBeCalledWith( user, response );
        expect( response.json ).toBeCalledWith( {
            result: {
                user,
                jwt,
            },
        } );
    } );

    it( 'requestPasswordReset', async () =>
    {
        const mockReset: Partial<PasswordReset> = {
            token: faker.random.uuid(),
        };
        const email = faker.internet.email();

        const passwordResetService = module.get( PasswordResetService );
        const spy = jest.spyOn( passwordResetService, 'createForUser' );
        spy.mockReturnValue( Promise.resolve( mockReset as PasswordResetDocument ) );

        const response = {
            json: jest.fn(),
        };

        await controller.requestPasswordReset( { email }, response as any );

        expect( response.json ).toBeCalledWith( {
            result: true,
        } );

        expect( spy ).toBeCalledWith( email );
    } );

    it( 'resetPassword', async () =>
    {
        const dto: PasswordResetDto = {
            token:    'test',
            password: faker.internet.password(),
        };
        const password = 'newPassword';

        const user: Partial<User> = {
            _id: '1',
        };

        const passwordResetService = module.get( PasswordResetService );
        const spy = jest.spyOn( passwordResetService, 'resetPassword' );
        spy.mockReturnValue( Promise.resolve( {
            user: user as UserDocument,
            password,
        } ) );

        const response = {
            json: jest.fn(),
        };

        await controller.resetPassword( dto, response as any );

        expect( spy ).toBeCalledWith( dto.token, dto.password );
        expect( response.json ).toBeCalledWith( {
            result: { user, password },
        } );
    } );

    it( 'logout', async () =>
    {
        const user: Partial<User> = {
            _id: '1',
        };
        const response = {
            json: jest.fn(),
        };

        const authService = module.get( AuthService );
        const spy = jest.spyOn( authService, 'logout' );
        spy.mockImplementation( () =>
        {
        } );

        await controller.logout( user as User, response as any );

        expect( spy ).toBeCalledWith( response );
        expect( response.json ).toBeCalledWith( {
            result: user,
        } );

    } );
} );
