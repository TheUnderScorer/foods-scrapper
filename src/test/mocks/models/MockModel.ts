export default abstract class MockModel<T>
{
    [ key: string ]: any;

    public static items: any = [];
    protected static execResult: any = null;

    public constructor( data: T = null )
    {
        Object.assign( this, data );
    }

    public static exec(): any
    {
        return this.execResult;
    }

    public static findOne( keys: object )
    {
        this.execResult = this.items.find( item =>
        {
            for ( const key in keys ) {
                if ( !keys.hasOwnProperty( key ) ) {
                    continue;
                }

                const value = keys[ key ];

                if ( item[ key ] === value ) {
                    return true;
                }
            }

            return false;
        } );

        return this;
    };

    public async save(): Promise<this>
    {
        return this;
    }

}
