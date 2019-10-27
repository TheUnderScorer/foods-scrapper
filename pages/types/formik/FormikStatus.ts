import { ReactElement } from 'react';

export default interface FormikStatus
{
    result?: boolean;
    error?: boolean;
    message?: string | ReactElement;
}
