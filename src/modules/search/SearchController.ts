import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { SearchService } from './search-service/search.service';
import ResponseResult from '../../types/ResponseResult';
import SearchDocument from './types/SearchDocument';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import User from '../users/types/User';

@Controller( 'search' )
export class SearchController
{

    public constructor(
        protected readonly searchService: SearchService,
    )
    {
    }

    @Get( ':searchID' )
    @UseGuards( AuthGuard( 'jwt' ) )
    public async getSearch( @Param() params, @Req() req: Request ): Promise<ResponseResult<SearchDocument>>
    {
        const model = await this.searchService.getBySearchID( params.searchID, ( req.user as User )._id.toString() );

        return {
            result: model,
        };
    }

}
