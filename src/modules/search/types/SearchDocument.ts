import { Document } from 'mongoose';
import Search from './Search';

export default interface SearchDocument extends Document, Search
{

}
