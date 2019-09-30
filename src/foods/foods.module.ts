import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { PyszneScrapperService } from '../scrappers/pyszne-scrapper/pyszne-scrapper.service';
import { PageLoaderService } from '../page-loader/page-loader.service';
import { MealsListService } from '../scrappers/meals-list/meals-list.service';
import { RestaurantService } from '../scrappers/restaurant/restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './schemas/food.schema';
import { FoodsService } from './foods/foods.service';

@Module( {
    controllers: [ FoodsController ],
    providers:   [ PyszneScrapperService, PageLoaderService, MealsListService, RestaurantService, FoodsService ],
    imports:     [ MongooseModule.forFeature( [ {
        name:   'Food',
        schema: FoodSchema,
    } ] ) ],
} )
export class FoodsModule
{
}
