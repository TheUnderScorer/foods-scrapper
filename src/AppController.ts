import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController
{

    @Render( 'Index' )
    @Get( '/' )
    public index()
    {
        return {
            title: 'Foods scrapper',
        };
    }
}
