import React from 'react';

import { Role } from '@uls/auth-common';

interface Props {
    /**
     * Minimal required role
     */
    requiredRole: Role;

    /**
     * Have to be exact role
     * {@default false}
     */
    exact?: boolean;

    /**
     * Component to show in case of success
     */
    component: React.ReactNode;

    /**
     * Component to show in case of unpriviliged access
     */
    unauthenticatedComponent: React.ReactNode;

    /**
     * GraphQL query to get user role
     */
    userQuery: () => { data?: { user?: { role?: Role } } };
}

function AuthenticatedRoute({
    requiredRole,
    exact,
    component,
    unauthenticatedComponent,
    userQuery,
}: Props): any {
    const userQueryResult = userQuery();
    const role = userQueryResult?.data?.user?.role;

    if (role === undefined) {
        return unauthenticatedComponent;
    }

    if (exact) {
        if (role === requiredRole) {
            return component;
        } else {
            return unauthenticatedComponent;
        }
    }
    if (role >= requiredRole) {
        return component;
    }
    return unauthenticatedComponent;
}

export default AuthenticatedRoute;
