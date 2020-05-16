import React, { ReactElement, forwardRef, useImperativeHandle } from 'react';
import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { string, array, object, number } from 'yup';

import {
    Song,
    Author,
    SongLine,
    ChordPosition,
    Strum,
} from '@uls/ukulele-common';
import {
    FormLabel,
    AsyncSelect,
    Input,
    FormControl,
    FormErrorMessage,
} from '@uls/look-react';
import {
    AUTHOR_SEARCH,
    AUTHOR_SEARCH_RETURN,
    AUTHOR_SEARCH_VARIABLES,
    CHORD_SEARCH_RETURN,
    CHORD_SEARCH_VARIABLES,
    CHORD_SEARCH,
    SongText,
} from '@uls/ukulele-react';

const chordPosSchema = object().shape<ChordPosition>({
    offset: number(),
    chord: object(),
});

const songLineSchema = object().shape<SongLine>({
    lyrics: string(),
    chords: array().of(chordPosSchema),
});

const authorSchema = object().shape<Author>({
    name: string().required('Author name is required'),
    members: array(),
});

const validationSchema = object().shape<Song<string>>({
    title: string().required('Title is required'),
    lyrics: array()
        .of(songLineSchema)
        .required('Lyrics are required'),
    author: authorSchema,
    creator: string(),
    chords: array().of(object()),
});

const Wrapper = styled.div`
    width: 100;
    height: 100;
`;

const defaultPattern = [
    Strum.D,
    Strum.U,
    Strum.D,
    Strum.U,
    Strum.D,
    Strum.U,
    Strum.D,
    Strum.U,
];

interface Props {
    song: Song<any>;
}

function EditableSongPage(
    { song: propsSong }: Props,
    ref: React.Ref<any>
): ReactElement {
    const client = useApolloClient();

    propsSong.strummingPattern &&
        propsSong.strummingPattern.pattern.length !== 8 &&
        (propsSong.strummingPattern.pattern = defaultPattern);

    const {
        handleChange,
        values,
        touched,
        errors,
        setFieldValue,
        dirty,
    } = useFormik<Song<string>>({
        initialValues: {
            title: propsSong.title || '',
            lyrics: propsSong.lyrics || [],
            chords: propsSong.chords || [],
            author: propsSong.author,
            creator: propsSong.creator || '',
            strummingPattern: propsSong.strummingPattern || {
                pattern: defaultPattern,
                metronomePreset: {
                    tempo: 100,
                },
            },
        },
        onSubmit: values => {},
        validationSchema,
    });

    const findAuthors = async (input: string) => {
        const { data } = await client.query<
            AUTHOR_SEARCH_RETURN,
            AUTHOR_SEARCH_VARIABLES
        >({
            query: AUTHOR_SEARCH,
            variables: { query: input },
        });
        return data.authorSearch.map(author => ({
            label: author.name,
            value: author.name,
            author: author,
        }));
    };

    const findChords = async (input: string) => {
        const { data } = await client.query<
            CHORD_SEARCH_RETURN,
            CHORD_SEARCH_VARIABLES
        >({
            query: CHORD_SEARCH,
            variables: { query: input },
        });
        return data.chordSearch.map(chord => ({
            label: chord.name,
            value: chord.name,
            chord: chord,
        }));
    };

    useImperativeHandle(ref, () => ({
        hasChanged: () => dirty,
        getSong: () => values as Song<string>,
    }));

    const onChangeStrum = (index: number) => (value: any) => {
        const newArray = values.strummingPattern?.pattern || [];
        newArray[index] = value;
        setFieldValue('strummingPattern', {
            ...values.strummingPattern,
            pattern: newArray,
        });
    };

    return (
        <Wrapper>
            <FormControl isInvalid={touched.title && !!errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    id="title"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={values.title}
                />
                <FormErrorMessage show={!!errors.title}>
                    {errors?.title}
                </FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="strummingPattern.metronomePreset.tempo">
                    Tempo
                </FormLabel>
                <Input
                    id="strummingPattern.metronomePreset.tempo"
                    type="number"
                    name="strummingPattern.metronomePreset.tempo"
                    placeholder="Tempo"
                    onChange={handleChange}
                    value={
                        values.strummingPattern?.metronomePreset?.tempo || 100
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel>Author</FormLabel>
                <AsyncSelect
                    keyName={'editsongauthor'}
                    value={
                        values.author && {
                            label: values.author.name,
                            value: values.author.name,
                            author: values.author,
                        }
                    }
                    multi={false}
                    loadOptions={findAuthors}
                    onChange={authorVal =>
                        setFieldValue('author', authorVal.author)
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel>Chords</FormLabel>
                <AsyncSelect
                    keyName={'editsongchords'}
                    // @ts-ignore
                    value={values.chords?.map(chord => ({
                        label: chord.name,
                        value: chord.name,
                        chord: chord,
                    }))}
                    multi={true}
                    loadOptions={findChords}
                    onChange={chordsVal =>
                        setFieldValue(
                            'chords',
                            chordsVal.map(value => value.chord)
                        )
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel>Strumming pattern</FormLabel>
                <br />
                {values.strummingPattern?.pattern.map((strum, i) => (
                    <select
                        key={`select-${i}`}
                        name={`strummingPattern.pattern.${i}`}
                        onChange={e =>
                            setFieldValue(
                                `strummingPattern.pattern.${i}`,
                                +e.target.value
                            )
                        }
                        value={strum}
                    >
                        {Object.values(Strum)
                            .filter(key => typeof key !== 'string')
                            .map((val: any) => (
                                <option
                                    value={val as number}
                                    key={`option-${i}-${val}`}
                                >
                                    {Strum[val]}
                                </option>
                            ))}
                    </select>
                ))}
            </FormControl>
            <FormControl>
                <FormLabel>Lyrics</FormLabel>
                <SongText songText={values.lyrics} editable={true} />
            </FormControl>
        </Wrapper>
    );
}

export default forwardRef(EditableSongPage);
