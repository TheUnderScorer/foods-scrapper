import useAxios from 'axios-hooks';

export default () =>
{
    return useAxios<string[]>( '/foods/services' );
}
