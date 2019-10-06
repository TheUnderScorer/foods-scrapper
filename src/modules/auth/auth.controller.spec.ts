import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth-service/auth.service';
import { getModelToken } from '@nestjs/mongoose';
import MockUser from '../../test/mocks/users/MockUser';
import { UsersService } from '../users/users-service/users.service';
import { ConfigModule } from '../config/config.module';

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
