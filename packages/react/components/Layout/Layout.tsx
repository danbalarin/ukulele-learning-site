import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import { Helmet } from 'react-helmet';

import { createGlobalStyle, useColorMode, Theme } from '@uls/look-react';

import { Topbar } from '../Topbar';
import { routes, RouteProps } from '../../routes';

const Wrapper = styled.div<{ colorMode: string }>`
    height: 100vh;
    padding-top: 56px;
    backdrop-filter: blur(5pt);
    z-index: 1;
    background-color: ${props =>
        Theme.modes?.[props.colorMode].containerBackground};
    max-width: ${`${Theme.breakpoints[2]}`};
    min-width: ${`${Theme.contentMinWidth}`};
    margin: auto;
`;

interface Props {}

function Layout({}: Props): ReactElement {
    const { colorMode } = useColorMode();
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>EasyUKU</title>
            </Helmet>
            <Global styles={createGlobalStyle(colorMode)} />
            <Topbar />
            <Wrapper colorMode={colorMode}>
                <Switch>
                    {routes.map((routeProps: RouteProps) => (
                        <Route {...routeProps} key={routeProps.path} />
                    ))}
                </Switch>
            </Wrapper>
        </>
    );
}

export default Layout;
