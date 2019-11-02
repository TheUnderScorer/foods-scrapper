import { AxiosResponse } from 'axios';
import ResponseResult from '../../src/types/ResponseResult';
import FormikStatus from '../types/formik/FormikStatus';

export type RequestHandler<ResponseType> = Promise<AxiosResponse<ResponseType>>;
export type ReturnResult<ResponseType> = Promise<HttpHandlerResult<AxiosResponse<ResponseType>>>;

export interface HttpHandlerResult<T>
{
    response: T;
    isEmpty: () => boolean;
}

const buildHttpHandler = <ResponseType extends ResponseResult<any>>( setStatus: ( status: FormikStatus ) => any ) => async ( requestHandler: () => RequestHandler<ResponseType> ): ReturnResult<ResponseType> => {
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
            setStatus( {
                           error: true,
                           message: data.message,
                       } );
        }
    }

    return {
        response,
        isEmpty: () => {
            const notEmpty = !!response && !!response.data && !!response.data.result;

            return !notEmpty;
        },
    };
};

export default buildHttpHandler;
