import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './UsersController';

describe( 'Users Controller', () =>
{
    let controller: UsersController;

    beforeEach( async () =>
    {
        const module: TestingModule = await Test.createTestingModule( {
            controllers: [ UsersController ],
        } ).compile();

        controller = module.get<UsersController>( UsersController );
    } );

    it( 'should be defined', () =>
    {
        expect( controller ).toBeDefined();
    } );

    it( 'getMe', async () =>
    {
        const request = {
            user: {
                _id: '1',
            },
        };

        const result = await controller.getMe( request as any );

        expect( result.result ).toEqual( request.user );
    } );
} );
