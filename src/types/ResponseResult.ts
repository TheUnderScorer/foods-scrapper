export default interface ResponseResult<T>
{
    result: T;
    error?: boolean;
    message?: string;
}
