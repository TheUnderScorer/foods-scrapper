import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export default class MockHttpArgumentHost implements HttpArgumentsHost
{

    public constructor(
        private request: any  = {},
        private response: any = {},
    )
    {
    }

    getNext<T = any>(): T
    {
        return undefined;
    }

    getRequest<T = any>(): T
    {
        return this.request;
    }

    getResponse<T = any>(): T
    {
        return this.response;
    }

}
