import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class NotLoggedGuard implements CanActivate
{
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean>
    {
        const request = context.switchToHttp().getRequest<Request>();

        return !request.cookies.jwt;
    }
}
