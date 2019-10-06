import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Next from 'next';
import { RenderModule, RenderService } from 'nest-next';

// TODO Setup next.js testing
async function bootstrap()
{
    const dev = process.env.NODE_ENV !== 'production';
    const next = Next( { dev } );
    await next.prepare();

    const server = await NestFactory.create( AppModule );

    const renderer = server.get( RenderModule );
    const rendererService = server.get( RenderService );

    await renderer.register( server, next );
    rendererService.setErrorHandler( async ( err, req, res ) =>
    {
        console.log( { err } );
        res.send( err.response );
    } );

    server.enableCors();

    await server.listen( 3000 );
}

bootstrap();
