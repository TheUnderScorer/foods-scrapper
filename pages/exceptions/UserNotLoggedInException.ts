export default class UserNotLoggedInException extends Error
{
    public readonly name: string = 'UserNotLoggedIn';

    public constructor( action: string )
    {
        super( `Cannot perform action ${ action }, reason - user is not logged in.` );
    }

}
