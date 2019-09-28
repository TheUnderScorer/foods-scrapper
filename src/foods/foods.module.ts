import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { PyszneScrapperService } from '../scrappers/pyszne-scrapper/pyszne-scrapper.service';
import { PageLoaderService } from '../page-loader/page-loader.service';
import { MealsListService } from '../scrappers/meals-list/meals-list.service';

@Module( {
    controllers: [ FoodsController ],
    providers:   [ PyszneScrapperService, PageLoaderService, MealsListService ],
} )
export class FoodsModule
{
}
