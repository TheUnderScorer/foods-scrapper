import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import SearchDocument from '../interfaces/search-document.interface';
import Search from '../interfaces/search.interface';

@Injectable()
export class SearchService
{

    public constructor(
        @InjectModel( 'Search' )
        protected readonly searchModel: Model<SearchDocument>,
    )
    {
    }

    public async create( search: Search ): Promise<SearchDocument>
    {
        const model = new this.searchModel( search );

        return await model.save();
    }

}
