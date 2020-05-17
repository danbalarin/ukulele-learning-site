import { Model, Types } from 'mongoose';

export const creator = (
    authException: any,
    model: Model<any>,
    field: string = 'creatorId'
) =>
    async function(
        resolve: any,
        source: any,
        args: any,
        context: any,
        info: any
    ) {
        const user = context?.user;
        const filter: any = {
            _id: args._id,
        };
        filter[field] = Types.ObjectId(user?._id);

        const wasCreatedByUser = await model.find(filter);

        if (!user || !wasCreatedByUser || wasCreatedByUser.length === 0) {
            throw new authException();
        }
        return resolve(source, args, context, info);
    };
