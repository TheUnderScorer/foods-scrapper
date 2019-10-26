import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import FoodDocument from '../types/FoodDocument';
import Food from '../types/Food';

@Injectable()
export class FoodsService
{

    public constructor(
        @InjectModel( 'Food' )
        protected readonly foodModel: Model<FoodDocument> )
    {
    }

    public async createMany( foods: Food[] ): Promise<FoodDocument[]>
    {
        return await this.foodModel.create( foods );
    }

    public async findAll(): Promise<FoodDocument[]>
    {
        return await this.foodModel.find().exec();
    }

}
