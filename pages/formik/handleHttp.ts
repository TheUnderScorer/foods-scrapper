import { AxiosResponse } from 'axios';

export type RequestHandler<ResponseType> = Promise<AxiosResponse<ResponseType>>;
export type ReturnResult<ResponseType> = Promise<AxiosResponse<ResponseType>>

const handleHttp = <ResponseType extends any = any>( setError: ( error: any ) => any ) => async ( requestHandler: () => RequestHandler<ResponseType> ): ReturnResult<ResponseType> =>
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

    return response;
};

export default handleHttp;
