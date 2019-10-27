import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../../users/users-service/UsersService';
import { ConfigModule } from '../../config/ConfigModule';
import PasswordResetService from './PasswordResetService';
import MockModel from '../../../test/mocks/models/MockModel';
import { AuthService } from '../auth-service/AuthService';
import User from '../../users/types/User';
import PasswordResetDocument from '../types/PasswordResetDocument';
import UserDocument from '../../users/types/UserDocument';
import { v4 } from 'uuid';
import { Schema } from 'mongoose';
import * as faker from 'faker';
import EmailModule from '../../email/EmailModule';
import { EmailTypesService } from '../../email/email-types/EmailTypesService';

jest.mock( 'uuid', () => ( {
    v4: () => 'test',
} ) );

describe( 'PasswordResetService', () =>
{
    let service: PasswordResetService;
    let module: TestingModule;

    beforeEach( async () =>
    {
        module = await Test.createTestingModule( {
            imports:   [ ConfigModule, EmailModule ],
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

    it( 'resetPassword', async () =>
    {
        const user: Partial<UserDocument> = {
            _id:  new Schema.Types.ObjectId( '1' ),
            save: jest.fn(),
        };
        const passwordResetDoc: Partial<PasswordResetDocument> = {
            user: user as UserDocument,
        };

        jest
            .spyOn( service, 'findByToken' )
            .mockReturnValue( Promise.resolve( passwordResetDoc as PasswordResetDocument ) );

        await service.resetPassword( v4() );

        expect( user.password ).toEqual( 'test' );
    } );

    it( 'createForUser', async () =>
    {
        const email = faker.internet.email();
        const user: Partial<User> = {
            _id: '1',
            email,
        };

        const usersService = module.get( UsersService );
        const findByEmailSpy = jest.spyOn( usersService, 'findByEmail' );
        findByEmailSpy.mockReturnValue( Promise.resolve( user as UserDocument ) );

        const haveRequestedResetSpy = jest.spyOn( service, 'haveRequestedReset' );
        haveRequestedResetSpy.mockReturnValue( Promise.resolve( false ) );

        const emailTypesService = module.get( EmailTypesService );
        const sendPasswordResetLinkSpy = jest.spyOn( emailTypesService, 'sendPasswordResetLink' );
        sendPasswordResetLinkSpy.mockReturnValue( Promise.resolve( true ) );

        const result = await service.createForUser( email );

        expect( haveRequestedResetSpy ).toBeCalledWith( email );

        expect( result.user ).toEqual( user );
        expect( result.token ).toEqual( 'test' );
        expect( sendPasswordResetLinkSpy ).toBeCalledTimes( 1 );
    } );
} );
