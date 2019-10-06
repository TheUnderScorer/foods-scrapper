export default interface ScrapperAction<T = any>
{
    action: ScrapperActions;
    payload: T;
}

export enum ScrapperActions
{
    Done = 'Done'
}
