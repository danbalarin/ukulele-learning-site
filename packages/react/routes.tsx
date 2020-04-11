import React from 'react';

import { AuthenticatedRoute } from '@uls/auth-react';
import { Role } from '@uls/auth-common';
import { useUserLocalQuery } from '@uls/user-react';

import { ProfilePage } from './pages/Profile';
import { HomePage } from './pages/Home';

import { NotFound } from './pages/NotFound';
import { Unauthorized } from './pages/Unauthorized';
import { MetronomePage } from './pages/Metronome';
import { ChordProgressionPage } from './pages/ChordProgression';
import { SearchPage } from './pages/Search';

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
        path: '/chordprogression/:id?',
        component: ChordProgressionPage,
    },
    {
        path: '/search',
        component: SearchPage,
    },
    {
        path: '/profile',
        children: (
            <AuthenticatedRoute
                requiredRole={Role.USER}
                component={<ProfilePage />}
                unauthenticatedComponent={<Unauthorized />}
                userQuery={useUserLocalQuery}
            />
        ),
    },
    {
        path: '/',
        component: NotFound,
    },
];
