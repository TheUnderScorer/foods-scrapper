import AuthContainerProps from './AuthContainerProps';

export default interface AuthPageProps extends AuthContainerProps
{
    title?: string;
    returnUrl: string;
    className?: string;
}
