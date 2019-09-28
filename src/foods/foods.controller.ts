import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from '../interfaces/response.interface';
import { Food } from './interfaces/food.interface';
import { PyszneScrapperService } from '../scrappers/pyszne-scrapper/pyszne-scrapper.service';
import { Scrapper } from '../scrappers/interfaces/scrapper.interface';
import GetFoodsDto from './dto/GetFoodsDto';
import { flatten } from 'lodash';

@Controller( 'foods' )
export class FoodsController
{
    private servicesMap: Record<string, Scrapper> = {
        pyszne: this.pyszneScrapper,
    };

    public constructor( private readonly pyszneScrapper: PyszneScrapperService )
    {
    }

    @Post()
    @UsePipes( new ValidationPipe() )
    public async getFoods(
        @Body() { location, keywords, services }: GetFoodsDto,
    ): Promise<Response<Food[]>>
    {
        const servicesToCall = this.getServicesToCall( services );
        const promises = servicesToCall.map( serviceToCall => serviceToCall.execute( keywords, location ) );
        const result = await Promise.all( promises );

        return {
            result: flatten( result ),
        };
    }

    private getServicesToCall( services: string[] ): Scrapper[]
    {
        return services
            .map( service =>
            {
                if ( this.servicesMap[ service ] ) {
                    return this.servicesMap[ service ];
                }

                return null;
            } )
            .filter( value => value );
    }

}
