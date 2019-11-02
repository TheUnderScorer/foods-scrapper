import { Module } from '@nestjs/common';
import { FoodsController } from './FoodsController';
import { PyszneScrapperService } from '../../services/scrappers/pyszne-scrapper/PyszneScrapperService';
import { PageLoaderService } from '../../services/page-loader/PageLoaderService';
import { MealsListService } from '../../services/scrappers/meals-list/MealsListService';
import { RestaurantService } from '../../services/scrappers/restaurant/RestaurantService';
import { MongooseModule } from '@nestjs/mongoose';
import foodSchema from './schemas/food.schema';
import { FoodsService } from './foods-service/FoodsService';
import { SearchService } from '../search/search-service/SearchService';
import searchSchema from '../search/schemas/searchSchema';

@Module( {
             controllers: [ FoodsController ],
             providers: [
                 PyszneScrapperService,
                 PageLoaderService,
                 MealsListService,
                 RestaurantService,
                 FoodsService,
                 SearchService,
             ],
             imports: [
                 MongooseModule.forFeature( [
                                                {
                                                    name: 'Food',
                                                    schema: foodSchema,
                                                },
                                                {
                                                    name: 'Search',
                                                    schema: searchSchema,
                                                },
                                            ] ) ],
         } )
export class FoodsModule
{

}
