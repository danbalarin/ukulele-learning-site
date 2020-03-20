import { Role } from '@uls/user-common';

/**
 * Checks whether user is logged and have atleast required role. In case of error throws error.
 * 
 * @param role Required role
 * @param authErr Object to be thrown in case of unsuccesfull authentication
 */
export const authMiddleware = (role: Role, authErr: any) => {
    return (resolve: any, source: any, args: any, context: any, info: any) => {
        if (!context?.user || context.user.role < role) {
            throw new authErr();
        }
        return resolve(source, args, context, info);
    };
};
