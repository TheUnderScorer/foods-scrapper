import AuthContainerProps from './auth-container-props.interface';

export default interface AuthPageProps extends AuthContainerProps
{
    title?: string;
    returnUrl: string;
}
