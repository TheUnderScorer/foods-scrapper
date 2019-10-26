import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchController } from './SearchController';
import searchSchema from './schemas/search.schema';
import { SearchService } from './search-service/search.service';

@Module( {
    providers:   [
        SearchService,
    ],
    imports:     [
        MongooseModule.forFeature( [
            {
                name:   'Search',
                schema: searchSchema,
            },
        ] ) ],
    controllers: [ SearchController ],
} )
export class SearchModule
{

}
