import { Injectable } from '@nestjs/common';
import Food from '../../../modules/foods/interfaces/food.interface';

@Injectable()
export class MockFoodsService
{
    protected readonly foods: Food[] = [];

    public async createMany( foods: Food[] ): Promise<Food[]>
    {
        this.foods.concat( foods );

        return foods;
    }

    public async findAll(): Promise<Food[]>
    {
        return this.foods;
    }

}
