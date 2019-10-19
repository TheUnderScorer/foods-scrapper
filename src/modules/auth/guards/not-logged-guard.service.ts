import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class NotLoggedGuard implements CanActivate
{
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean>
    {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        if ( request.body.user ) {
            return response.redirect( '/' );
        }

        return true;
    }
}
