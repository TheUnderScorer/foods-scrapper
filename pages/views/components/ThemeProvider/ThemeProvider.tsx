import * as React from 'react';
import { FC } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const ThemeProvider: FC = ( { children } ) =>
{
    const theme = createMuiTheme();

    return (
        <MuiThemeProvider theme={ theme }>
            { children }
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
