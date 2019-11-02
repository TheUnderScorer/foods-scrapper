import { mount } from 'enzyme';
import Notice, { getNoticeColor, NoticeColor, NoticeProps } from './Notice';
import * as React from 'react';
import { ThemeProvider as MuiThemeProvder } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { green, yellow } from '@material-ui/core/colors';
import { CropSquare } from '@material-ui/icons';

describe( 'Notice', () => {
    const theme = createMuiTheme();

    const mountComponent = ( props: NoticeProps ) => {
        return mount( (
                          <MuiThemeProvder theme={ theme }>
                              <ThemeProvider theme={ theme }>
                                  <Notice { ...props } />
                              </ThemeProvider>
                          </MuiThemeProvder>
                      ) );
    };

    it( 'renders without crashing', () => {
        mountComponent( {
                            type: 'error',
                        } );
    } );

    it.each( [
                 [ 'error', theme.palette.error.main ],
                 [ 'success', green.A400 ],
                 [ 'notice', yellow.A400 ],
             ] )( 'getNoticeColor', ( type: NoticeColor, expectedColor: string ) => {
        const color = getNoticeColor( type, theme );

        expect( color ).toEqual( expectedColor );
    } );

    it( 'renders icon if it is provided', () => {
        const component = mountComponent( {
                                              type: 'notice',
                                              icon: <CropSquare/>,
                                          } );

        const icon = component.find( CropSquare );
        expect( icon ).toHaveLength( 1 );
    } );
} );
