import { Role } from '@uls/auth-common';

/**
 * Creates function that accepts {@link Role} and returns middleware function for resolvers
 * Checks whether user is logged and have atleast required role. In case of error throws exception.
 *
 * @param role Required role
 * @param authException Object to be thrown in case of unsuccesfull authentication
 */
export const authMiddleware = (authException: any) => {
    return function(role: Role) {
        return (
            resolve: any,
            source: any,
            args: any,
            context: any,
            info: any
        ) => {
            if (!context?.user || context.user.role < role) {
                throw new authException();
            }
            return resolve(source, args, context, info);
        };
    };
};
