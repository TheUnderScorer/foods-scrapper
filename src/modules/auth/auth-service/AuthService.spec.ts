import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './AuthService';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../../users/users-service/UsersService';
import { ConfigModule } from '../../config/ConfigModule';
import MockModel from '../../../test/mocks/models/MockModel';
import User from '../../users/types/User';
import UserDocument from '../../users/types/UserDocument';
import { compare } from 'bcrypt';
import * as faker from 'faker';

jest.mock( 'bcrypt', () => ( {
    compare: jest.fn(),
} ) );

describe( 'AuthService', () =>
{
    let service: AuthService;
    let module: TestingModule;

    beforeEach( async () =>
    {
        jest.resetModules();

        module = await Test.createTestingModule( {
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

    it.each( [
        [
            {
                _id:      '1',
                email:    faker.internet.email(),
                password: faker.internet.password(),
            },
            'test',
        ],
        [
            {
                _id:      '1',
                email:    faker.internet.email(),
                password: 'test_pw',
            },
            'test_pw',
        ],
    ] )( 'validateUser', async ( user: any, password: string ) =>
    {
        const mockCompare = compare as jest.Mock;
        mockCompare.mockReturnValueOnce( Promise.resolve( user.password === password ) );

        const usersService = module.get( UsersService );
        const spy = jest.spyOn( usersService, 'findByEmail' );
        spy.mockReturnValue( Promise.resolve( user as UserDocument ) );

        const result = await service.validateUser(
            user.email,
            password,
        );

        expect( spy ).toBeCalledWith( user.email );

        if ( user.password === password ) {
            expect( result ).toEqual( user );
        } else {
            expect( result ).toBeNull();
        }

        expect( mockCompare ).toBeCalledWith( password, user.password );
    } );
} );
