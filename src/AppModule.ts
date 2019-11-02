import { Module } from '@nestjs/common';
import { FoodsModule } from './modules/foods/FoodsModule';
import { PageLoaderService } from './services/page-loader/PageLoaderService';
import { PyszneScrapperService } from './services/scrappers/pyszne-scrapper/PyszneScrapperService';
import { MealsListService } from './services/scrappers/meals-list/MealsListService';
import { RestaurantService } from './services/scrappers/restaurant/RestaurantService';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './modules/search/SearchModule';
import { RenderModule } from 'nest-next';
import { AppController } from './AppController';
import { AuthModule } from './modules/auth/AuthModule';
import { ConfigModule } from './modules/config/ConfigModule';
import EmailModule from './modules/email/EmailModule';
import GoogleModule from './modules/google/GoogleModule';

@Module( {
             providers: [ PageLoaderService, PyszneScrapperService, MealsListService, RestaurantService ],
             imports: [
                 MongooseModule.forRoot( 'mongodb://localhost/expressmongo', {
                     useNewUrlParser: true,
                     useUnifiedTopology: true,
                 } ),
                 SearchModule,
                 FoodsModule,
                 RenderModule,
                 AuthModule,
                 ConfigModule,
                 EmailModule,
                 GoogleModule,
             ],
             controllers: [ AppController ],
         } )
export class AppModule
{

}
