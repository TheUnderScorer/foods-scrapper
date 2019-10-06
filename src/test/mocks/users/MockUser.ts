import * as faker from 'faker';
import User from '../../../modules/users/interfaces/user.interface';

export default class MockUser
{
    public readonly users: User[] = [
        {
            _id:      '1',
            email:    faker.internet.email(),
            password: faker.internet.password(),
        },
    ];

    protected result: User | null = null;

    public findOne( keys: object )
    {
        this.result = this.users.find( user =>
        {
            for ( const key in keys ) {
                if ( !keys.hasOwnProperty( key ) ) {
                    continue;
                }

                const value = keys[ key ];

                if ( user[ key ] === value ) {
                    return true;
                }
            }

            return false;
        } );

        return this;
    };

    public async exec()
    {
        return this.result;
    }
}
