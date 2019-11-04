import * as React from 'react';
import { FC } from 'react';
import { FormikProps, withFormik } from 'formik';
import ScrapperFormProps from './types/ScrapperFormProps';
import GetFoodsDto from '../../../src/modules/foods/dto/GetFoodsDto';
import { Fab, Grid, TextField } from '@material-ui/core';
import { Fastfood, Place, Search } from '@material-ui/icons';
import { getInputError } from '../../formik/errors';
import { CardForm } from '../card-page/styled';
import styled from 'styled-components';

const Form = styled( CardForm )`
  .submit-btn {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

const ScrapperForm: FC<FormikProps<GetFoodsDto> & ScrapperFormProps> = ( props ) =>
{
    const { handleSubmit, touched, errors } = props;

    const getError = getInputError<GetFoodsDto>( touched, errors );

    return (
        <Form itemsSpacing="2.5rem" minHeight="auto" action="#" onSubmit={ handleSubmit }>
            <Grid justify="center" container>
                <Grid className="form-item" item xs={ 11 }>
                    <TextField
                        helperText={
                            getError( 'keywords' ) ?
                                getError( 'keywords' ) :
                                'Enter as many search phrases as you would like. Ex. pizza, sushi etc...' }
                        InputProps={ {
                            startAdornment: (<Search/>),
                        } }
                        fullWidth
                        label="Keywords"/>
                </Grid>
                <Grid className="form-item" item xs={ 11 }>
                    <TextField
                        helperText={
                            getError( 'location' ) ?
                                getError( 'location' ) :
                                'Enter your location' }
                        InputProps={ {
                            startAdornment: (<Place/>),
                        } }
                        fullWidth
                        label="Location"/>
                </Grid>
                <Grid className="form-item" item xs={ 11 }>
                    <TextField
                        select
                        helperText={
                            getError( 'services' ) ?
                                getError( 'services' ) :
                                'Select food services that we will search through' }
                        InputProps={ {
                            startAdornment: (<Fastfood/>),
                        } }
                        fullWidth
                        label="Services">
                    </TextField>
                </Grid>
                <Grid item xs={ 11 } className="form-item">
                    <Fab className="submit-btn" type="submit" size="large" variant="extended" color="primary">
                        Search for foods
                    </Fab>
                </Grid>
            </Grid>
        </Form>
    );
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