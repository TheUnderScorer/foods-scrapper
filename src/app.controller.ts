import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req } from 'express';
import User from './modules/users/interfaces/user.interface';

@Controller()
export class AppController
{
    @Render( 'Index' )
    @Get()
    public index()
    {
        return {
            title: 'Foods scrapper',
        };
    }
}
