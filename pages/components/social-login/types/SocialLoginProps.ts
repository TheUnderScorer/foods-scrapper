export type SetLoading = ( loading: boolean ) => any;

export default interface SocialLoginProps
{
    googleID?: string;
    onLoadingChange?: SetLoading;
    disabled?: boolean;
}
