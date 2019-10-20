import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController
{

    @Render( 'Index' )
    @Get( '/' )
    public index( @Req() req: Request, @Res() res: Response )
    {
        return {
            title: 'Foods scrapper',
        };
    }
}
