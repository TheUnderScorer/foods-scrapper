import { BadRequestException, Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from '../interfaces/response.interface';
import { Food } from './interfaces/food.interface';
import { PyszneScrapperService } from '../scrappers/pyszne-scrapper/pyszne-scrapper.service';
import GetFoodsDto from './dto/GetFoodsDto';
import Scrapper from '../scrappers/interfaces/scrapper.interface';

@Controller( 'foods' )
export class FoodsController
{
    private servicesMap: Record<string, Scrapper> = {
        pyszne: this.pyszneScrapper,
    };

    public constructor( private readonly pyszneScrapper: PyszneScrapperService )
    {
    }

    @Get( '/services-map' )
    public getServicesMap(): Response<string[]>
    {
        return {
            result: Object.keys( this.servicesMap ),
        };
    }

    @Post()
    @UsePipes( new ValidationPipe() )
    public async getFoods(
        @Body() { location, keywords, services }: GetFoodsDto,
    ): Promise<Response<Food[]>>
    {
        const servicesToCall = this.getServicesToCall( services );

        try {
            const promises = servicesToCall.map( serviceToCall => serviceToCall.execute( keywords, location ) );

            Promise
                .all( promises )
                .then( result => console.log( result ) )
                .catch( err => console.error( 'Scrapping service error:', err ) );

            return {
                result: [],
            };
        } catch ( e ) {
            console.error( `Get foods error: ${ e }` );

            throw new BadRequestException( e );
        }
    }

    private getServicesToCall( services: string[] ): Scrapper[]
    {
        return services
            .map( service =>
            {
                if ( this.servicesMap[ service ] ) {
                    return this.servicesMap[ service ];
                }

                throw new BadRequestException( `Invalid service provided: ${ service }` );
            } );
    }

}
