import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class NotLoggedRedirect implements NestMiddleware
{
    public use( req: Request, res: Response, next: () => void )
    {
        if ( !req.body.user ) {
            return res.redirect( '/auth/login' );
        }

        return next();
    }
}
