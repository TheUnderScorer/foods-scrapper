import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './UsersService';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigModule } from '../../config/ConfigModule';
import MockModel from '../../../test/mocks/models/MockModel';
import User from '../types/User';

describe( 'UsersService', () =>
{
    let service: UsersService;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            providers: [
                UsersService,
                {
                    provide: getModelToken( 'User' ),
                    useValue: MockModel,
                },
            ],
            imports: [ ConfigModule ],
        } ).compile();

        service = module.get<UsersService>( UsersService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'findByEmail', async () =>
    {
        const user: Partial<User> = {
            _id: '1',
        };

        const spy = jest.spyOn( MockModel, 'findOne' );
        spy.mockReturnValue( {
            exec: () => user,
        } as any );

        const result = await service.findByEmail( 'test@gmail.com' );

        expect( result ).toEqual( user );
    } );
} );
