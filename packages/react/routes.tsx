import React from 'react';

import { AuthenticatedRoute } from '@uls/user-react';
import { Role } from '@uls/user-common';

import { ProfilePage } from './pages/Profile';
import { HomePage } from './pages/Home';

import { NotFound } from './pages/NotFound';
import { Unauthorized } from './pages/Unauthorized';
import { MetronomePage } from './pages/Metronome';

export interface RouteProps {
    path: string;
    exact?: boolean;
    component?: any;
    children?: any;
}

export const routes: RouteProps[] = [
    {
        exact: true,
        path: '/',
        component: HomePage,
    },
    {
        path: '/metronome',
        component: MetronomePage,
    },
    {
        path: '/profile',
        children: (
            <AuthenticatedRoute
                requiredRole={Role.USER}
                component={<ProfilePage />}
                unauthenticatedComponent={<Unauthorized />}
            />
        ),
    },
    {
        path: '/',
        component: NotFound,
    },
];
