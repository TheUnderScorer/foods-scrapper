import { Module } from '@nestjs/common';
import { FoodsModule } from './foods/foods.module';
import { PageLoaderService } from './page-loader/page-loader.service';
import { PyszneScrapperService } from './scrappers/pyszne-scrapper/pyszne-scrapper.service';
import { MealsListService } from './scrappers/meals-list/meals-list.service';

@Module( {

    providers: [ PageLoaderService, PyszneScrapperService, MealsListService ],
    imports:   [ FoodsModule ],
} )
export class AppModule
{
}
