import React, {
    ReactElement,
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';
import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { string, array, object, number, mixed } from 'yup';

import {
    Song,
    Author,
    MetronomePreset,
    SongLine,
    ChordPosition,
    Chord,
    Tone,
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
import SongTextLine from '../../../../.yarn/$$virtual/@uls-ukulele-react-virtual-fc78971b44/1/modules/ukulele/react/components/SongText/SongTextLine';

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

interface Props {
    song: Song<any>;
}

function EditableSongPage(
    { song: propsSong }: Props,
    ref: React.Ref<any>
): ReactElement {
    const client = useApolloClient();

    const { handleChange, values, touched, errors, setFieldValue } = useFormik<
        Song<string>
    >({
        initialValues: {
            title: propsSong.title || '',
            lyrics: propsSong.lyrics || [],
            chords: propsSong.chords || [],
            author: propsSong.author,
            creator: propsSong.creator || '',
            strummingPattern: propsSong.strummingPattern,
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
        console.log(data);
        return data.authorSearch.map(author => ({
            label: author.name,
            value: author,
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
            value: chord,
        }));
    };

    useImperativeHandle(ref, () => ({
        getSong: () => values as Song<string>,
    }));

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
                            value: values.author,
                        }
                    }
                    loadOptions={findAuthors}
                    onChange={authorVal =>
                        setFieldValue('author', authorVal.value)
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel>Chords</FormLabel>
                <AsyncSelect
                    keyName={'editsongchords'}
                    // @ts-ignore
                    value={values.chords.map(chord => ({
                        label: chord.name,
                        value: chord,
                        toString: () => `${chord.name}`,
                    }))}
                    multi={true}
                    loadOptions={findChords}
                    onChange={chordsVal =>
                        setFieldValue('chords', chordsVal.value)
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel>Lyrics</FormLabel>
                <SongText songText={values.lyrics} editable={true} />
            </FormControl>
        </Wrapper>
    );
}

export default forwardRef(EditableSongPage);
