import * as React from 'react';
import { FC } from 'react';
import Head from 'next/head';

interface AppHeadProps
{
    title: string;
}

const AppHead: FC<AppHeadProps> = ( { title } ) =>
{
    return (
        <Head>
            <title>{ title }</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
    );
};

export default AppHead;
