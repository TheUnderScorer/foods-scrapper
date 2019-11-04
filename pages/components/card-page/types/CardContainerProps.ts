import { WidthProperty } from 'csstype';

export default interface CardContainerProps
{
    backgroundUrl?: string;
    cardMaxWidth?: string;
    cardWidth?: WidthProperty<number>;
    containerHeight?: string;
}
