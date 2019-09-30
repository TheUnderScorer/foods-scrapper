import { BadRequestException, Body, Controller, flatten, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from '../interfaces/response.interface';
import Food from './interfaces/food.interface';
import { PyszneScrapperService } from '../scrappers/pyszne-scrapper/pyszne-scrapper.service';
import GetFoodsDto from './dto/GetFoodsDto';
import Scrapper from '../scrappers/interfaces/scrapper.interface';
import { FoodsService } from './foods/foods.service';
import { SearchService } from './search/search.service';
import Search, { SearchStatus } from './interfaces/search.interface';
import { Types } from 'mongoose';
import SearchDocument from './interfaces/search-document.interface';

@Controller( 'foods' )
export class FoodsController
{
    private servicesMap: Record<string, Scrapper> = {
        pyszne: this.pyszneScrapper,
    };

    public constructor(
        protected readonly pyszneScrapper: PyszneScrapperService,
        protected readonly foodsService: FoodsService,
        protected readonly searchService: SearchService,
    )
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
    ): Promise<Response<string>>
    {
        const servicesToCall = this.getServicesToCall( services );
        const searchID = new Types.ObjectId();
        const search: Search = {
            searchID,
            date:   new Date(),
            foods:  [],
            status: SearchStatus.Pending,
        };
        const searchModel = await this.searchService.create( search );

        try {
            const promises = servicesToCall.map( serviceToCall => serviceToCall.execute( keywords, location ) );

            Promise
                .all( promises )
                .then( result => this.saveFoods( flatten( result ), searchModel ) )
                .catch( err => console.error( 'Scrapping service error:', err ) );

            return {
                result: searchID.toHexString(),
            };
        } catch ( e ) {
            console.error( `Get foods error: ${ e }` );

            throw new BadRequestException( e );
        }
    }

    protected async saveFoods( foods: Food[], searchModel: SearchDocument ): Promise<void>
    {
        if ( !foods.length ) {
            console.log( '0 foods saved.' );

            return;
        }

        await searchModel.updateOne( {
            foods,
            status: SearchStatus.Done,
        } );

        console.log( 'Found foods: ', foods.length );
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
