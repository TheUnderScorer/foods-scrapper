import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../../users/users-service/UsersService';
import { ConfigModule } from '../../config/ConfigModule';
import PasswordResetService from './PasswordResetService';
import MockModel from '../../../test/mocks/models/MockModel';
import { AuthService } from '../auth-service/AuthService';

describe( 'PasswordResetService', () =>
{
    let service: PasswordResetService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            imports:   [ ConfigModule ],
            providers: [
                PasswordResetService,
                AuthService,
                {
                    provide:  getModelToken( 'User' ),
                    useValue: MockModel,
                },
                {
                    provide:  getModelToken( 'PasswordReset' ),
                    useValue: MockModel,
                },
                UsersService,
            ],
        } ).compile();

        service = module.get<PasswordResetService>( PasswordResetService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );
} );
