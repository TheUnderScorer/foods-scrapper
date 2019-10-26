import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './AuthService';
import { getModelToken } from '@nestjs/mongoose';
import MockUser from '../../../test/mocks/users/MockUser';
import { UsersService } from '../../users/users-service/UsersService';
import { ConfigModule } from '../../config/ConfigModule';

describe( 'AuthService', () =>
{
    let service: AuthService;

    const mockUser = new MockUser();

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            imports:   [ ConfigModule ],
            providers: [
                AuthService,
                {
                    provide:  getModelToken( 'User' ),
                    useValue: mockUser,
                },
                UsersService,
            ],
        } ).compile();

        service = module.get<AuthService>( AuthService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
