import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

import { GlobalStyle, useColorMode, Theme } from '@uls/look-react';

import { Topbar } from '../Topbar';
import { routes, RouteProps } from '../../routes';

const Wrapper = styled.div<{ colorMode: string }>`
    height: 100vh;
    padding-top: 56px;
    backdrop-filter: blur(5pt);
    z-index: 1;
    background-color: ${props =>
        props.colorMode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.1)'};
    max-width: ${`${Theme.breakpoints[2]}`};
    min-width: ${`${Theme.contentMinWidth}`};
    margin: auto;
`;

interface Props {}

function Layout({}: Props): ReactElement {
    const { colorMode } = useColorMode();
    return (
        <>
            <GlobalStyle colorMode={colorMode} />
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
