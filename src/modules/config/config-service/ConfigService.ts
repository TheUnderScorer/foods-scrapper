import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService
{
    public constructor( protected readonly config: Record<string, string> = {} )
    {
    }

    public get( key: string ): string
    {
        return this.config[ key ];
    }

}
