import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as faker from 'faker';
import { getModelToken } from '@nestjs/mongoose';

describe( 'UsersService', () =>
{
    let service: UsersService;

    const mockModel = {
        users:  [
            {
                id:       1,
                email:    faker.internet.email(),
                password: faker.internet.password(),
            },
        ],
        result: null,
        findOne( keys: object )
        {
            this.result = this.users.find( user =>
            {
                for ( const key in keys ) {
                    if ( !keys.hasOwnProperty( key ) ) {
                        continue;
                    }

                    const value = keys[ key ];

                    if ( user[ key ] === value ) {
                        return true;
                    }
                }

                return false;
            } );

            return this;
        },
        exec()
        {
            return Promise.resolve( this.result );
        },
    };

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [
                UsersService,
                {
                    provide:  getModelToken( 'User' ),
                    useValue: mockModel,
                },
            ],
        } ).compile();

        service = module.get<UsersService>( UsersService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'findByEmail', async () =>
    {
        const result = await service.findByEmail( mockModel.users[ 0 ].email );

        expect( result ).toEqual( mockModel.users[ 0 ] );
    } );
} );
