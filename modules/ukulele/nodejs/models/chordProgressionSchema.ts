import {
    Resolver,
    ObjectTypeComposer,
    ResolverResolveParams,
} from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import {
    createChordProgressionModel,
    MODEL_NAME as CHORDPROGRESSION_MODEL_NAME,
} from './chordProgressionModel';
import { creator } from '../utils';

interface TCProps {
    ChordTC: ObjectTypeComposer;
    StrummingPatternTC: ObjectTypeComposer;
    MetronomePresetTC: ObjectTypeComposer;
}

export const createChordProgressionSchema = (
    options: ServerModuleOptions<ObjectTypeComposer>,
    { ChordTC, MetronomePresetTC, StrummingPatternTC }: TCProps
) => {
    const ChordProgressionModel = createChordProgressionModel(options);

    const ChordProgressionTC = composeWithMongoose(ChordProgressionModel, {});

    const updateOrCreateMetronome = async (
        { tempo }: { tempo: number },
        otherProps: any
    ) => {
        try {
            const metronomeProps = {
                ...otherProps,
                args: { record: { tempo } },
            };
            const metronomeResult = await MetronomePresetTC.getResolver(
                'findOrCreate'
            ).resolve(metronomeProps);
            return metronomeResult.recordId;
        } catch (err) {
            console.log(err);
        }
    };

    const updateOrCreateStrummingPattern = async (
        {
            pattern,
            metronomePresetId,
        }: { pattern: number[]; metronomePresetId?: string },
        otherProps: any
    ) => {
        try {
            const strummingProps = {
                ...otherProps,
                args: {
                    record: {
                        pattern,
                        metronomePresetId,
                    },
                },
            };
            const strummingResult = await StrummingPatternTC.getResolver(
                'createOne'
            ).resolve(strummingProps);
            return strummingResult.recordId;
        } catch (err) {
            console.log(err);
        }
    };

    const prepareChordProgression = async (
        resolveProps: ResolverResolveParams<any, any>
    ) => {
        let metronomeId = await updateOrCreateMetronome(
            { tempo: resolveProps.args.tempo },
            resolveProps
        );

        let strummingPatternId = await updateOrCreateStrummingPattern(
            {
                pattern: resolveProps.args.strummingPattern,
                metronomePresetId: metronomeId,
            },
            resolveProps
        );

        const chordProgressionProps = {
            ...resolveProps,
            args: { record: {} as any },
        };

        chordProgressionProps.args.record = {
            ...resolveProps.args.chordProgression,
        };
        chordProgressionProps.args.record.creatorId =
            resolveProps.context.user._id;
        chordProgressionProps.args.record.strummingPatternId = strummingPatternId;
        resolveProps.args._id &&
            (chordProgressionProps.args.record._id = resolveProps.args._id); // for update
        return chordProgressionProps;
    };

    ChordProgressionTC.addRelation('strummingPattern', {
        resolver: () => StrummingPatternTC.getResolver('findById'),
        prepareArgs: {
            _id: source => source.strummingPatternId,
        },
        projection: { strummingPatternId: true },
    });

    ChordProgressionTC.addRelation('creator', {
        resolver: () => options.creatorModel?.getResolver('findById'),
        prepareArgs: {
            _id: source => source.creatorId,
        },
        projection: { creatorId: true },
    });

    ChordProgressionTC.addRelation('chords', {
        resolver: () => ChordTC.getResolver('findMany'),
        prepareArgs: {
            filter: source => ({ _ids: source.chordsIds }),
        },
        projection: { chordsIds: true },
    });

    ChordProgressionTC.addResolver({
        name: 'createNested',
        args: {
            chordProgression: ChordProgressionTC.getITC()
                .removeField(['strummingPatternId', 'creatorId'])
                .makeRequired(['name', 'chordsIds']),
            strummingPattern: StrummingPatternTC.getITC().getField('pattern'),
            tempo: MetronomePresetTC.getITC().getField('tempo'),
        },
        type: ChordProgressionTC.getResolver('createOne').getType(),
        resolve: async (resolveProps: ResolverResolveParams<any, any>) => {
            const chordProgressionProps = await prepareChordProgression(
                resolveProps
            );

            return ChordProgressionTC.getResolver('createOne').resolve(
                chordProgressionProps
            );
        },
    });

    ChordProgressionTC.addResolver({
        name: 'updateNested',
        args: {
            _id: ChordProgressionTC.getResolver('updateById')
                .getArgITC('record')
                .getFieldTC('_id'),
            chordProgression: ChordProgressionTC.getITC()
                .removeField(['strummingPatternId', 'creatorId'])
                .makeRequired(['name', 'chordsIds']),
            strummingPattern: StrummingPatternTC.getITC().getField('pattern'),
            tempo: MetronomePresetTC.getITC().getField('tempo'),
        },
        type: ChordProgressionTC.getResolver('updateById').getType(),
        resolve: async (resolveProps: ResolverResolveParams<any, any>) => {
            const chordProgressionProps = await prepareChordProgression(
                resolveProps
            );
            return ChordProgressionTC.getResolver('updateById').resolve(
                chordProgressionProps
            );
        },
    });

    const query = {
        chordProgressionById: ChordProgressionTC.getResolver('findById'),
        chordProgressionByIds: ChordProgressionTC.getResolver('findByIds'),
        chordProgressionOne: ChordProgressionTC.getResolver('findOne'),
        chordProgressionMany: ChordProgressionTC.getResolver('findMany'),
        chordProgressionCount: ChordProgressionTC.getResolver('count'),
        chordProgressionPagination: ChordProgressionTC.getResolver(
            'pagination'
        ),
    };

    const authenticated = authMiddleware(options.errors.authorizationError);
    const chordProgressionCreator = creator(
        options.errors.authorizationError,
        ChordProgressionModel
    );

    const mutation = {
        chordProgressionCreateOne: ChordProgressionTC.getResolver(
            'createNested',
            [authenticated(Role.USER)]
        ),
        chordProgressionUpdateById: ChordProgressionTC.getResolver(
            'updateNested',
            [authenticated(Role.USER), chordProgressionCreator]
        ),
        chordProgressionUpdateByIdModerator: ChordProgressionTC.getResolver(
            'updateById',
            [authenticated(Role.MODERATOR)]
        ),
    };

    const model: Omit<
        ServerModuleModel<any, Resolver, ObjectTypeComposer>,
        'seed'
    > = {
        mutation,
        query,
        name: CHORDPROGRESSION_MODEL_NAME,
        typeComposer: ChordProgressionTC,
    };

    return model;
};
