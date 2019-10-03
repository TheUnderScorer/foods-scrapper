import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Next from 'next';
import { RenderModule } from 'nest-next';

async function bootstrap()
{
    const dev = process.env.NODE_ENV !== 'production';
    const next = Next( { dev } );
    await next.prepare();

    const server = await NestFactory.create( AppModule );
    const renderer = server.get( RenderModule );
    await renderer.register( server, next );

    server.enableCors();

    await server.listen( 3000 );
}

bootstrap();
