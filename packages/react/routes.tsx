import React from 'react';
import loadable from '@loadable/component';

import { AuthenticatedRoute } from '@uls/auth-react';
import { Role } from '@uls/auth-common';
import { useUserLocalQuery } from '@uls/user-react';

const ProfilePage = loadable(() => import('./pages/Profile/ProfilePage'));
const HomePage = loadable(() => import('./pages/Home/HomePage'));
const NotFound = loadable(() => import('./pages/NotFound/NotFoundPage'));
const Unauthorized = loadable(() =>
    import('./pages/Unauthorized/UnauthorizedPage')
);
const MetronomePage = loadable(() => import('./pages/Metronome/MetronomePage'));
const ChordProgressionPage = loadable(() =>
    import('./pages/ChordProgression/ChordProgressionPage')
);
const SearchPage = loadable(() => import('./pages/Search/SearchPage'));

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
