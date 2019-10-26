import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './AuthController';
import { AuthService } from './auth-service/AuthService';
import { getModelToken } from '@nestjs/mongoose';
import MockUser from '../../test/mocks/users/MockUser';
import { UsersService } from '../users/users-service/UsersService';
import { ConfigModule } from '../config/ConfigModule';

describe( 'Auth Controller', () =>
{
    let controller: AuthController;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
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
} );
