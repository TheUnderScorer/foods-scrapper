import { Module } from '@nestjs/common';
import { FoodsModule } from './foods/foods.module';
import { PageLoaderService } from './page-loader/page-loader.service';
import { PyszneScrapperService } from './scrappers/pyszne-scrapper/pyszne-scrapper.service';
import { MealsListService } from './scrappers/meals-list/meals-list.service';
import { RestaurantService } from './scrappers/restaurant/restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './search/search.module';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';

@Module( {
    providers:   [ PageLoaderService, PyszneScrapperService, MealsListService, RestaurantService ],
    imports:     [
        SearchModule,
        FoodsModule,
        MongooseModule.forRoot( 'mongodb://localhost/expressmongo', {
            useNewUrlParser:    true,
            useUnifiedTopology: true,
        } ),
        RenderModule,
    ],
    controllers: [ AppController ],
} )
export class AppModule
{
}
