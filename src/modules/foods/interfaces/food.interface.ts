export default interface Food
{
    name: string;
    price: number;
    url: string;
    description?: string;
    restaurantName?: string;
    searchID?: string;
    searchDate?: Date;
}
