import { Injectable } from '@nestjs/common';
import Search from '../../../modules/search/types/Search';

@Injectable()
export class MockSearchService
{
    protected readonly items: Search[] = [];

    public async create( search: Search ): Promise<Search>
    {
        this.items.push( search );

        return search;
    }

    public async getBySearchID( searchID: string ): Promise<Search | undefined>
    {
        return this.items.find( item => item.searchID === searchID );
    }

}
