export interface Result<T>
{
    result: T;
    error?: boolean;
    message?: string;
}
