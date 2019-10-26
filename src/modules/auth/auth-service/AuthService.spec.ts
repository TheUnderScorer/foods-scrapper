import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './AuthService';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../../users/users-service/UsersService';
import { ConfigModule } from '../../config/ConfigModule';
import MockModel from '../../../test/mocks/models/MockModel';

describe( 'AuthService', () =>
{
    let service: AuthService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            imports:   [ ConfigModule ],
            providers: [
                AuthService,
                {
                    provide:  getModelToken( 'User' ),
                    useValue: MockModel,
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
