import * as React from 'react';
import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { Grid, Theme, Typography } from '@material-ui/core';
import { green, yellow } from '@material-ui/core/colors';
import { GridProps } from '@material-ui/core/Grid';
import { Check, Error, Warning } from '@material-ui/icons';

export type NoticeColor = 'error' | 'success' | 'notice';

export interface NoticeProps extends GridProps
{
    type: NoticeColor;
    icon?: ReactElement | string;
}

export const getNoticeColor = ( noticeColor: NoticeColor, theme: Theme ): string => {
    switch ( noticeColor ) {
        case 'error':
            return theme.palette.error.main;

        case 'success':
            return green.A400;

        case 'notice':
            return yellow.A400;

        default:
            console.error( 'Invalid notice color provided: ', noticeColor );

            return '';
    }
};

export const iconsMap: Record<NoticeColor, ReactElement> = {
    error: <Error/>,
    success: <Check/>,
    notice: <Warning/>,
};

const NoticeContainer = styled( Grid )<NoticeProps>`
    background: ${ props => getNoticeColor( props.type, props.theme ) };
    padding: 1rem;
    margin-bottom: 2rem !important;
            
    * {
        color: ${ props => props.theme.palette.common.white }
      }
      
      .with-icon {
        padding-left: 0.5rem;
      }
`;

const Notice: FC<NoticeProps> = ( { children, type, icon, ...props } ) => {
    return (
        <NoticeContainer { ...props } item type={ type }>
            <Grid alignItems="center" container>
                <Grid item xs={ 1 }>
                    { icon ? icon : iconsMap[ type ] }
                </Grid>
                <Grid className="with-icon" item xs={ 11 }>
                    <Typography className="notice-text" variant="body2">
                        { children }
                    </Typography>
                </Grid>
            </Grid>
        </NoticeContainer>
    );
};

export default Notice;
