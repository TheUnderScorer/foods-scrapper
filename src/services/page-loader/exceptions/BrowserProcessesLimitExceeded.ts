export default class BrowserProcessesLimitExceeded extends Error
{
    public constructor()
    {
        super( 'Exceeded limit of maximum browser processes.' );
        this.name = 'BrowserProcessesLimitExceeded';
    }

}
