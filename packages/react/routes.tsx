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
const ChordPage = loadable(() => import('./pages/Chord/ChordPage'));
const SongListPage = loadable(() => import('./pages/SongList/SongListPage'));
const SongPage = loadable(() => import('./pages/Song/SongPage'));
const AuthorPage = loadable(() => import('./pages/Author/AuthorPage'));
const ChordListPage = loadable(() => import('./pages/ChordList/ChordListPage'));
const ChordProgressionPage = loadable(() =>
    import('./pages/ChordProgression/ChordProgressionPage')
);
const SearchPage = loadable(() => import('./pages/Search/SearchPage'));
const AdminUsersPage = loadable(() =>
    import('./pages/AdminUsers/AdminUsersPage')
);
const AdminAuthorPage = loadable(() =>
    import('./pages/AdminAuthor/AdminAuthorPage')
);
const AdminSongPage = loadable(() => import('./pages/AdminSong/AdminSongPage'));

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
        path: '/chords',
        component: ChordListPage,
    },
    {
        path: '/chord/:name',
        component: ChordPage,
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
        path: '/songs',
        component: SongListPage,
    },
    {
        path: '/song/:id',
        component: SongPage,
    },
    {
        path: '/author/:id',
        component: AuthorPage,
    },
    {
        path: '/admin/song/:id?',
        children: (
            <AuthenticatedRoute
                requiredRole={Role.MODERATOR}
                component={<AdminSongPage />}
                unauthenticatedComponent={<Unauthorized />}
                userQuery={useUserLocalQuery}
            />
        ),
    },
    {
        path: '/admin/author/:id?',
        children: (props: any) => (
            <AuthenticatedRoute
                requiredRole={Role.MODERATOR}
                component={<AdminAuthorPage {...props} />}
                unauthenticatedComponent={<Unauthorized />}
                userQuery={useUserLocalQuery}
            />
        ),
    },
    {
        path: '/admin/song/:id?',
        children: (
            <AuthenticatedRoute
                requiredRole={Role.MODERATOR}
                component={<AdminSongPage />}
                unauthenticatedComponent={<Unauthorized />}
                userQuery={useUserLocalQuery}
            />
        ),
    },
    {
        path: '/admin/users',
        children: (
            <AuthenticatedRoute
                requiredRole={Role.ADMIN}
                component={<AdminUsersPage />}
                unauthenticatedComponent={<Unauthorized />}
                userQuery={useUserLocalQuery}
            />
        ),
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
        path: '/unauthorized',
        component: Unauthorized,
    },
    {
        path: '/',
        component: NotFound,
    },
];
