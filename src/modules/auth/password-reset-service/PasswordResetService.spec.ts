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
import PasswordReset from '../types/PasswordReset';

jest.mock( 'uuid', () => ({
    v4: () => 'test',
}) );

jest.mock( 'bcrypt', () => ({
    hash: jest.fn().mockReturnValue( Promise.resolve( 'hashed' ) ),
}) );

describe( 'PasswordResetService', () => {
    let service: PasswordResetService;
    let module: TestingModule;

    beforeEach( async () => {
        module = await Test.createTestingModule( {
                                                     imports: [ ConfigModule, EmailModule ],
                                                     providers: [
                                                         PasswordResetService,
                                                         AuthService,
                                                         {
                                                             provide: getModelToken( 'User' ),
                                                             useValue: MockModel,
                                                         },
                                                         {
                                                             provide: getModelToken( 'PasswordReset' ),
                                                             useValue: MockModel,
                                                         },
                                                         UsersService,
                                                     ],
                                                 } ).compile();

        service = module.get<PasswordResetService>( PasswordResetService );
    } );

    it( 'should be defined', () => {
        expect( service ).toBeDefined();
    } );

    it( 'resetPassword', async () => {
        const password = 'test';

        const user: Partial<UserDocument> = {
            _id: new Schema.Types.ObjectId( '1' ),
            save: jest.fn(),
        };
        const passwordResetDoc: Partial<PasswordResetDocument> = {
            user: user as UserDocument,
            remove: jest.fn(),
        };

        jest
            .spyOn( service, 'findByToken' )
            .mockReturnValue( Promise.resolve( passwordResetDoc as PasswordResetDocument ) );

        await service.resetPassword( v4(), password );

        expect( user.password ).toEqual( 'hashed' );
        expect( user.save ).toBeCalledTimes( 1 );
        expect( passwordResetDoc.remove ).toBeCalledTimes( 1 );
    } );

    it( 'createForUser', async () => {
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

    it( 'reSend email', async () => {
        const mockRequest: any = {
            token: faker.random.uuid(),
            user: {
                email: faker.internet.email(),
            },
        };
        const findByEmailSpy = jest.spyOn( service, 'findByEmail' );
        findByEmailSpy.mockReturnValue( Promise.resolve( mockRequest ) );

        const emailService = module.get( EmailTypesService );
        const emailSpy = jest.spyOn( emailService, 'sendPasswordResetLink' );
        emailSpy.mockReturnValue( Promise.resolve( true ) );

        const result = await service.reSendEmail( mockRequest.user.email );
        expect( result ).toBeTruthy();

        expect( findByEmailSpy ).toBeCalledWith( mockRequest.user.email );
        expect( emailSpy ).toBeCalledWith( mockRequest, mockRequest.user.email );
    } );
} );
