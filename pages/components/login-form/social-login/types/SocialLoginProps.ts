export type SetLoading = ( loading: boolean ) => any;
export type OnError = ( error: string ) => any;

export default interface SocialLoginProps
{
    googleID?: string;
    facebookID?: string;
    onLoadingChange?: SetLoading;
    disabled?: boolean;
    onError: OnError;
}
