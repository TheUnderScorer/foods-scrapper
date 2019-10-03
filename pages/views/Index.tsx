import * as React from 'react';
import { NextPage, NextPageContext } from 'next';

const Index: NextPage<any> = ( { title } ) =>
{
    return (
        <div>
            Welcome on { title }!
        </div>
    );
};

Index.getInitialProps = async ( ctx: NextPageContext ) =>
{
    const { query } = ctx;

    return { ...query };
};

export default Index;
