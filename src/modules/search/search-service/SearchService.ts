import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import SearchDocument from '../types/SearchDocument';
import Search from '../types/Search';

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

    public async getBySearchID( searchID: string, user: string ): Promise<SearchDocument>
    {
        return await this.searchModel.findOne( {
                                                   searchID,
                                                   user,
                                               } ).exec();
    }

}
