import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './AuthController';
import { AuthService } from './auth-service/AuthService';
import { getModelToken } from '@nestjs/mongoose';
import MockUser from '../../test/mocks/users/MockUser';
import { UsersService } from '../users/users-service/UsersService';
import { ConfigModule } from '../config/ConfigModule';
import * as faker from 'faker';
import UserDto from './dto/UserDto';
import User from '../users/types/User';

describe( 'Auth Controller', () =>
{
    let controller: AuthController;
    let module: TestingModule;

    beforeEach( async () =>
    {
        module = await Test.createTestingModule( {
            controllers: [ AuthController ],
            providers:   [
                AuthService,
                UsersService,
                {
                    provide:  getModelToken( 'User' ),
                    useValue: MockUser,
                },
            ],
            imports:     [ ConfigModule ],
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
        userSpy.mockReturnValue( Promise.resolve( user as User ) );

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
} );
