import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import Next from 'next';
import { RenderModule, RenderService } from 'nest-next';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

async function bootstrap()
{
    dotenv.config( {
        path: `${ process.env.NODE_ENV || 'development' }.env`,
    } );

    const dev = process.env.NODE_ENV !== 'production';

    const server = await NestFactory.create( AppModule );
    const next = Next( {
        dev,
        conf: {
            env: {
                SERVER_ENV: process.env.NODE_ENV || 'development',
            },
        },
    } );
    await next.prepare();

    server.use( cookieParser() );

    const renderer = server.get( RenderModule );
    const rendererService = server.get( RenderService );

    await renderer.register( server, next );
    rendererService.setErrorHandler( async ( err, req, res ) =>
    {
        res.send( err.response );
    } );

    server.enableCors();

    await server.listen( 3000 );
}

bootstrap();
