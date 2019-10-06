import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService
{
    protected readonly config: Record<string, string> = {};

    public constructor( path: string )
    {
        this.config = dotenv.parse( fs.readFileSync( path ) );
    }

    public get( key: string ): string
    {
        return this.config[ key ];
    }

}
