import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './SearchService';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

describe( 'SearchService', () =>
{
    let service: SearchService;
    let findOne: jest.Mock;
    let save: jest.Mock;
    let exec: jest.Mock;
    let serviceMock: jest.Mock;

    beforeEach( async () =>
    {
        findOne = jest.fn();
        save = jest.fn();
        exec = jest.fn();
        serviceMock = jest.fn().mockImplementation( () => ({
                findOne( args: any )
                {
                    findOne( args );

                    return this;
                },
                async exec()
                {
                    exec();

                    return this;
                },
                save()
                {
                    save();

                    return this;
                },
            }),
        );

        const module: TestingModule = await Test.createTestingModule( {
            providers: [
                SearchService,
                {
                    provide: getModelToken( 'Search' ),
                    useValue: serviceMock,
                },
            ],
        } ).compile();

        service = module.get<SearchService>( SearchService );
    } );

    it( 'should be defined', () =>
    {
        expect( service ).toBeDefined();
    } );

    it( 'create', async () =>
    {
        const search: any = {
            searchID: new Types.ObjectId().toHexString(),
        };

        await service.create( search );

        expect( save ).toBeCalledTimes( 1 );
    } );

    it( 'getBySearchID', async () =>
    {
        const user = '1';
        const searchID = new Types.ObjectId().toHexString();
        const service = new SearchService( new serviceMock() );

        await service.getBySearchID( searchID, user );

        expect( findOne ).toBeCalledWith( { searchID, user } );
        expect( exec ).toBeCalledTimes( 1 );
    } );
} );
