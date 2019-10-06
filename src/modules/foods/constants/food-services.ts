import Scrapper from '../../../services/scrappers/interfaces/scrapper.interface';

const foodServices: Record<string, Scrapper> = {
    pyszne: this.pyszneScrapper,
};

export type FoodServices = typeof foodServices;

export default foodServices;
