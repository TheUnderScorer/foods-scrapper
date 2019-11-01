export default class InvalidLogoutResponseException extends Error
{
    public readonly name: string = 'InvalidLogoutResponse';

    public constructor()
    {
        super( 'Invalid server response received during logout.' );
    }
}
