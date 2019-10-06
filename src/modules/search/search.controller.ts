import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search-service/search.service';
import { Result } from '../../interfaces/response.interface';
import SearchDocument from './interfaces/search-document.interface';

@Controller( 'search' )
export class SearchController
{

    public constructor(
        protected readonly searchService: SearchService,
    )
    {
    }

    @Get( ':searchID' )
    public async getSearch( @Param() params ): Promise<Result<SearchDocument>>
    {
        const model = await this.searchService.getBySearchID( params.searchID );

        return {
            result: model,
        };
    }

}
