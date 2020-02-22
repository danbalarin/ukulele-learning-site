import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router';

import { Topbar } from '../Topbar';
import { routes } from '../../routes';

interface Props {}

function Layout({}: Props): ReactElement {
    return (
        <>
            <Topbar />
            <Switch>
                {routes.map(route => (
                    <Route {...route} key={route.path} />
                ))}
            </Switch>
        </>
    );
}

export default Layout;
