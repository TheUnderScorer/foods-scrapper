import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { PyszneScrapperService } from '../scrappers/pyszne-scrapper/pyszne-scrapper.service';
import { PageLoaderService } from '../page-loader/page-loader.service';
import { MealsListService } from '../scrappers/meals-list/meals-list.service';
import { RestaurantService } from '../scrappers/restaurant/restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import foodSchema from './schemas/food.schema';
import { FoodsService } from './foods-service/foods.service';
import { SearchService } from '../search/search-service/search.service';
import searchSchema from '../search/schemas/search.schema';

@Module( {
    controllers: [ FoodsController ],
    providers:   [
        PyszneScrapperService,
        PageLoaderService,
        MealsListService,
        RestaurantService,
        FoodsService,
        SearchService,
    ],
    imports:     [
        MongooseModule.forFeature( [
            {
                name:   'Food',
                schema: foodSchema,
            },
            {
                name:   'Search',
                schema: searchSchema,
            },
        ] ) ],
} )
export class FoodsModule
{

}
