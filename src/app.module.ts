import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';

@Module( {
  controllers: [ AppController ],
  providers:   [ AppService ],
  imports: [FoodsModule],
} )
export class AppModule
{
}
