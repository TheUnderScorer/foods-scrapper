import { Module } from '@nestjs/common';
import { FoodsModule } from './foods/foods.module';
import { PageLoaderService } from './page-loader/page-loader.service';
import { PyszneScrapperService } from './scrappers/pyszne-scrapper/pyszne-scrapper.service';

@Module( {

    providers: [ PageLoaderService, PyszneScrapperService ],
    imports:   [ FoodsModule ],
} )
export class AppModule
{
}
