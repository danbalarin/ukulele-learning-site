import { Resolver, ObjectTypeComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import {
    createMetronomePresetModel,
    MODEL_NAME as METRONOME_PRESET_MODEL_NAME,
} from './metronomePresetModel';

export const createMetronomePresetSchema = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const MetronomePresetModel = createMetronomePresetModel(options);

    const MetronomePresetTC = composeWithMongoose(MetronomePresetModel, {});

    MetronomePresetTC.addResolver({
        name: 'findOrCreate',
        type: MetronomePresetTC.getResolver('createOne').getType(),
        args: MetronomePresetTC.getResolver('createOne').getArgs(),
        resolve: async ({ args }: any) => {
            let metronomePreset = await MetronomePresetModel.findOne(
                args.record
            ).exec();
            if (!metronomePreset) {
                metronomePreset = await MetronomePresetModel.create(
                    args.record
                );
            }

            return {
                record: metronomePreset,
                recordId: MetronomePresetTC.getRecordIdFn()(metronomePreset),
            };
        },
    });

    const query = {
        metronomePresetById: MetronomePresetTC.getResolver('findById'),
    };

    const authenticated = authMiddleware(options.errors.authorizationError);

    const mutation = {
        metronomePresetFindOrCreate: MetronomePresetTC.getResolver(
            'findOrCreate',
            [authenticated(Role.USER)]
        ),
        metronomePresetUpdateById: MetronomePresetTC.getResolver('updateById', [
            authenticated(Role.MODERATOR),
        ]),
    };

    const model: Omit<
        ServerModuleModel<any, Resolver, ObjectTypeComposer>,
        'seed'
    > = {
        mutation,
        query,
        name: METRONOME_PRESET_MODEL_NAME,
        typeComposer: MetronomePresetTC,
    };

    return model;
};
