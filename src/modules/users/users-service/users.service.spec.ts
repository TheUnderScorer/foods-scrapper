import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import MockUser from '../../../test/mocks/users/MockUser';
import { ConfigModule } from '../../config/config.module';

describe( 'UsersService', () =>
{
    let service: UsersService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [
                UsersService,
                {
                    provide:  getModelToken( 'User' ),
                    useValue: MockUser,
                },
            ],
            imports:   [ ConfigModule ],
        } ).compile();

        service = module.get<UsersService>( UsersService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'findByEmail', async () =>
    {
        const result = await service.findByEmail( MockUser.items[ 0 ].email );

        expect( result ).toEqual( MockUser.items[ 0 ] );
    } );
} );
