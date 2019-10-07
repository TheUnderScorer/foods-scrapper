import * as React from 'react';
import { FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledTheme } from 'styled-components';
import theme from '../../theme';

const ThemeProvider: FC = ( { children } ) =>
{
    return (
        <MuiThemeProvider theme={ theme }>
            <StyledTheme theme={ theme }>
                { children as any }
            </StyledTheme>
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
