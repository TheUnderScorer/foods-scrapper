import * as faker from 'faker';
import User from '../../../modules/users/interfaces/user.interface';
import MockModel from '../models/MockModel';

export default class MockUser extends MockModel<User>
{
    public static items: User[] = [
        {
            _id:      '1',
            email:    faker.internet.email(),
            password: faker.internet.password(),
        },
    ];

    protected result: User | null = null;

}
