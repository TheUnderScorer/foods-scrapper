import * as React from 'react';
import { FC } from 'react';
import { FormikProps, withFormik } from 'formik';
import ScrapperFormProps from './types/ScrapperFormProps';
import GetFoodsDto from '../../../src/modules/foods/dto/GetFoodsDto';

const ScrapperForm: FC<FormikProps<GetFoodsDto> & ScrapperFormProps> = ( props ) =>
{
    return null;
};

const formikWrapper = withFormik<ScrapperFormProps, GetFoodsDto>( {
    mapPropsToValues: ( { defaults = {} } ) => ({
        services: defaults.services ? defaults.services : [],
        keywords: defaults.keywords ? defaults.keywords : [],
        location: defaults.location ? defaults.location : '',
    }),
    handleSubmit: async () =>
    {
    },
} );

export default formikWrapper( ScrapperForm );