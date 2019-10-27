import * as React from 'react';
import { NextPage } from 'next';
import useAxios, { configure } from 'axios-hooks';
import client from '../http/client';
import { Routes } from '../http/types/Routes';
import ResponseResult from '../../src/types/ResponseResult';
import ResetPasswordResult from '../../src/modules/auth/password-reset-service/types/ResetPasswordResult';
import AuthPage from '../components/auth-page/AuthPage';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const ResetPassword: NextPage = () =>
{
    configure( {
        axios: client,
    } );

    const query = new URLSearchParams( process.browser ? location.search : '' );

    const [ { loading, error, data } ] = useAxios<ResponseResult<ResetPasswordResult>>( {
        method: 'POST',
        url:    Routes.resetPassword,
        data:   query,
    } );

    return (
        <AuthPage title="Reset password" returnUrl={ Routes.login }>
            <Grid container justify="center">
                { loading && <CircularProgress/> }
                { !loading &&
                  <div>
                      { data && data.result &&
                        <>
                            <Typography>
                                Your password have been set to:
                            </Typography>
                            <Typography>
                                <strong>{ data.result.password }</strong>
                            </Typography>
                        </>
                      }
                      {
                          error &&
                          <>
                              <Typography color="error">
                                  Error: { error.response ? error.response.data.message : error.message }
                              </Typography>
                          </>
                      }
                  </div>
                }
            </Grid>
        </AuthPage>
    );
};

export default ResetPassword;
