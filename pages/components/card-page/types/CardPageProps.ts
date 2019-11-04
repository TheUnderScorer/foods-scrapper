import CardContainerProps from './CardContainerProps';

export default interface CardPageProps extends CardContainerProps
{
    title?: string;
    returnUrl?: string;
    className?: string;
}
