import { Role } from '@uls/user-common';

export const authMiddleware = (role: Role, authErr: any) => {
    return (resolve: any, source: any, args: any, context: any, info: any) => {
        if (!context?.user || context.user.role < role) {
            throw new authErr();
        }
        return resolve(source, args, context, info);
    };
};
