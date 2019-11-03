import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './UsersService';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigModule } from '../../config/ConfigModule';
import MockModel from '../../../test/mocks/models/MockModel';
import User from '../types/User';
import * as faker from 'faker';
import { hash } from 'bcrypt';
import { ConfigService } from '../../config/config-service/ConfigService';

jest.mock( 'bcrypt', () => ({
    hash: jest.fn().mockImplementation( ( val: string, rounds: number ) => Promise.resolve( val ) ),
}) );

describe( 'UsersService', () =>
{
    let service: UsersService;
    let module: TestingModule;

    beforeEach( async () =>
    {
        module = await Test.createTestingModule( {
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

    it( 'create', async () =>
    {
        const config = module.get( ConfigService );

        const email = faker.internet.email();
        const password = faker.internet.password();
        const beforeCreate = jest.fn();
        const hashFn = hash as jest.Mock;

        const findByEmailSpy = jest.spyOn( service, 'findByEmail' );
        findByEmailSpy.mockReturnValue( Promise.resolve( undefined ) );

        const result = await service.create( email, password, beforeCreate );

        expect( findByEmailSpy ).toBeCalledWith( email );
        expect( result.email ).toEqual( email );
        expect( result.password ).toEqual( password );
        expect( beforeCreate ).toBeCalledWith( result );
        expect( hashFn ).toBeCalledWith( password, parseInt( config.get( 'BCRYPT_ROUNDS' ) ) );
    } );
} );
