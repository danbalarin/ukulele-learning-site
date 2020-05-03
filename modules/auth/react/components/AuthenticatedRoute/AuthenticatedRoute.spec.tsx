import React from 'react';
import { shallow } from 'enzyme';

import AuthenticatedRoute from './AuthenticatedRoute';

const authenticatedComponent = <span>success</span>;

const unauthenticatedComponent = <div>unauthenticated</div>;

const noRoleUserQuery = () => ({ data: { user: {} } });
const userUserQuery = () => ({ data: { user: { role: 0 } } });
const moderatorUserQuery = () => ({ data: { user: { role: 1 } } });
const adminUserQuery = () => ({ data: { user: { role: 2 } } });

it('should render unauthenticated without role', () => {
    const component = shallow(
        <AuthenticatedRoute
            requiredRole={1}
            component={authenticatedComponent}
            unauthenticatedComponent={unauthenticatedComponent}
            userQuery={noRoleUserQuery}
        />
    );

    expect(component.equals(unauthenticatedComponent)).toBe(true);
});

it('should render unauthenticated with unsufficient role', () => {
    const component = shallow(
        <AuthenticatedRoute
            requiredRole={1}
            component={authenticatedComponent}
            unauthenticatedComponent={unauthenticatedComponent}
            userQuery={userUserQuery}
        />
    );

    expect(component.equals(unauthenticatedComponent)).toBe(true);
});

it('should render authenticated with exact role', () => {
    const component = shallow(
        <AuthenticatedRoute
            requiredRole={1}
            component={authenticatedComponent}
            unauthenticatedComponent={unauthenticatedComponent}
            userQuery={moderatorUserQuery}
            exact={true}
        />
    );

    expect(component.equals(authenticatedComponent)).toBe(true);
});

it('should render authenticated with higher role', () => {
    const component = shallow(
        <AuthenticatedRoute
            requiredRole={1}
            component={authenticatedComponent}
            unauthenticatedComponent={unauthenticatedComponent}
            userQuery={adminUserQuery}
        />
    );

    expect(component.equals(authenticatedComponent)).toBe(true);
});

it('should render unauthenticated with not exact role', () => {
    const component = shallow(
        <AuthenticatedRoute
            requiredRole={1}
            component={authenticatedComponent}
            unauthenticatedComponent={unauthenticatedComponent}
            userQuery={adminUserQuery}
            exact={true}
        />
    );

    expect(component.equals(unauthenticatedComponent)).toBe(true);
});
