export default interface ResponseResult<T>
{
    result: T;
    error?: string;
    message?: string;
}
