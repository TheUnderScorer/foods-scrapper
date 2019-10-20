import { AxiosResponse } from 'axios';
import { Result } from '../../src/interfaces/response.interface';
import { isEmpty as empty } from 'lodash';

export type RequestHandler<ResponseType> = Promise<AxiosResponse<ResponseType>>;
export type ReturnResult<ResponseType> = Promise<HttpHandlerResult<AxiosResponse<ResponseType>>>;

export interface HttpHandlerResult<T>
{
    response: T;
    isEmpty: () => boolean;
}

const buildHttpHandler = <ResponseType extends Result<any>>( setError: ( error: any ) => any ) => async ( requestHandler: () => RequestHandler<ResponseType> ): ReturnResult<ResponseType> =>
{
    let data: ResponseType;
    let response: AxiosResponse<ResponseType>;

    try {
        response = await requestHandler();

        data = response.data;
    } catch ( e ) {
        response = e.response;
        data = e.response.data;
    } finally {
        if ( data.error ) {
            setError( data.message );
        }
    }

    return {
        response,
        isEmpty: () =>
                 {
                     const isEmpty = !!response && !!response.data && !!response.data.result && !empty( response.data.result );

                     return !isEmpty;
                 },
    };
};

export default buildHttpHandler;
