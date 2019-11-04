import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import AppHead from '../components/app-head/AppHead';
import useAuthGuard from '../hooks/useAuthGuard';
import Header from '../components/header/Header';
import CardPage from '../components/card-page/CardPage';
import styled from 'styled-components';
import ScrapperForm from '../components/scrapper-form/ScrapperForm';

const IndexContainer = styled( CardPage )`
  .card-header {
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
`;

const Index: NextPage<any> = ( { title = 'Foods scrapper' } ) =>
{
    useAuthGuard();

    return (
        <>
            <AppHead title={ title }/>
            <Header title={ title }/>
            <IndexContainer
                cardWidth="50vw"
                cardMinWidth="300px"
                cardMaxWidth="600px"
                title={ title }
                containerHeight="calc(100vh - 64px)"
                backgroundUrl="/static/landscape.jpg">
                <ScrapperForm/>
            </IndexContainer>
        </>
    );
};

Index.getInitialProps = async ( ctx: NextPageContext ) =>
{
    const { query } = ctx;

    return { ...query };
};

export default Index;
