import { IsArray, IsString } from 'class-validator';

export default class GetFoodsDto
{
    @IsArray()
    public readonly services: string[];

    @IsArray()
    public readonly keywords: string[];

    @IsString()
    public readonly location: string;
}
