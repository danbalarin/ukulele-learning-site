import React from 'react';

import { Role } from '@uls/user-common';
import { useUserLocalQuery } from '../../graphql/user';

interface Props {
    requiredRole: Role;
    exact?: boolean;
    component: React.ReactNode;
    unauthenticatedComponent: React.ReactNode;
}

function AuthenticatedRoute({
    requiredRole,
    exact,
    component,
    unauthenticatedComponent,
}: Props): any {
    const userQuery = useUserLocalQuery();
    const role = userQuery?.data?.user?.role;

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
