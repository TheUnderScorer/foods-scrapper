import { ExecutionContext } from '@nestjs/common';
import MockHttpArgumentHost from './MockHttpArgumentHost';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export default class MockContext<T> implements Partial<ExecutionContext>
{

    public constructor(
        protected readonly mockHttpArgumentHost: MockHttpArgumentHost = new MockHttpArgumentHost(),
    )
    {
    }

    public switchToHttp(): HttpArgumentsHost
    {
        return this.mockHttpArgumentHost;
    }

}
