import { BadRequestException, Body, Controller, flatten, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import ResponseResult from '../../types/ResponseResult';
import Food from './types/Food';
import { PyszneScrapperService } from '../../services/scrappers/pyszne-scrapper/PyszneScrapperService';
import GetFoodsDto from './dto/GetFoodsDto';
import Scrapper from '../../services/scrappers/types/Scrapper';
import { Types } from 'mongoose';
import SearchDocument from '../search/types/SearchDocument';
import Search, { SearchStatus } from '../search/types/Search';
import { SearchService } from '../search/search-service/SearchService';
import { Request as Req } from 'express';
import { AuthGuard } from '@nestjs/passport';
import User from '../users/types/User';

@Controller( 'foods' )
export class FoodsController
{
    private servicesMap: Record<string, Scrapper> = {
        pyszne: this.pyszneScrapper,
    };

    public constructor(
        protected readonly pyszneScrapper: PyszneScrapperService,
        protected readonly searchService: SearchService,
    )
    {
    }

    @Get( '/services-map' )
    public getServicesMap(): ResponseResult<string[]>
    {
        return {
            result: Object.keys( this.servicesMap ),
        };
    }

    @Post()
    @UsePipes( new ValidationPipe() )
    @UseGuards( AuthGuard( 'jwt' ) )
    public async getFoods(
        @Body() { location, keywords, services }: GetFoodsDto,
        @Request() req: Req,
    ): Promise<ResponseResult<SearchDocument>>
    {
        const servicesToCall = this.getServicesToCall( services );
        const search: Search = {
            searchID: new Types.ObjectId(),
            user:     ( req.user as User )._id.toString(),
            date:     new Date(),
            foods:    [],
            status:   SearchStatus.Pending,
            error:    '',
            keywords,
            location,
            services,
        };
        const searchModel = await this.searchService.create( search );

        try {
            const promises = servicesToCall.map( serviceToCall => serviceToCall.execute( keywords, location ) );

            Promise
                .all( promises )
                .then( result => this.saveFoods( flatten( result ), searchModel ) )
                .catch( err => this.handleError( err, searchModel ) );

            return {
                result: searchModel.toJSON(),
            };
        } catch ( e ) {
            console.error( `Get foods error: ${ e }` );

            throw new BadRequestException( e );
        }
    }

    protected async handleError( error: Error, searchModel: SearchDocument ): Promise<void>
    {
        await searchModel.updateOne( {
            status: SearchStatus.Error,
            error:  error.message,
        } );
    }

    protected async saveFoods( foods: Food[], searchModel: SearchDocument ): Promise<void>
    {
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
