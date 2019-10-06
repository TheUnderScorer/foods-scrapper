import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import MockUser from '../../../test/mocks/users/MockUser';
import { UsersService } from '../../users/users-service/users.service';
import { ConfigModule } from '../../config/config.module';

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
