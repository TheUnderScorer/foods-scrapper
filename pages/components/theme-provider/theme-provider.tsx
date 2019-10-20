import * as React from 'react';
import { FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledTheme } from 'styled-components';
import { createTheme } from '../../theme/create-theme';

const ThemeProvider: FC = ( { children } ) =>
{
    const theme = createTheme();

    return (
        <MuiThemeProvider theme={ theme }>
            <StyledTheme theme={ theme }>
                { children as any }
            </StyledTheme>
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
