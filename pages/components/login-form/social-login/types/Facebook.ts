export default interface Facebook
{
    init: ( config: FacebookConfig ) => any;
}

export interface FacebookConfig
{
    version: string;
    appId: string;
}

declare global
{
    interface Window
    {
        FB: Facebook;
    }
}