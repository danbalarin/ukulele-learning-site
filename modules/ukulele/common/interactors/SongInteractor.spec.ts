import { Song } from '../entities/Song';
import { SongInteractor } from './SongInteractor';

let si: SongInteractor<any>;

const song: Song<any> = {
    title: 'Song title',
    chords: [],
    creator: 'creatorId',
    lyrics: 'text',
    author: { name: 'author' },
    strummingPattern: { pattern: [0] },
};

beforeEach(() => {
    si = new SongInteractor(song);
});

it('should update values', () => {
    const title: Partial<Song<any>> = {
        title: 'New song title',
    };

    const chords: Partial<Song<any>> = {
        chords: [{ name: 'G', strings: [0, 0, 0, 0] }],
    };

    const creator: Partial<Song<any>> = {
        creator: 'admin',
    };

    const lyrics: Partial<Song<any>> = {
        lyrics: 'new text',
    };

    const author: Partial<Song<any>> = {
        author: { name: 'new author' },
    };

    const strummingPattern: Partial<Song<any>> = {
        strummingPattern: { pattern: [1] },
    };

    const songTitle = si.update(title);
    const songChords = si.update(chords);
    const songCreator = si.update(creator);
    const songLyrics = si.update(lyrics);
    const songAuthor = si.update(author);
    const songStrummingPattern = si.update(strummingPattern);

    expect(songTitle).toEqual({ ...song, title: 'New song title' });
    expect(songChords).toEqual({
        ...song,
        chords: [{ name: 'G', strings: [0, 0, 0, 0] }],
    });
    expect(songCreator).toEqual({ ...song, creator: 'admin' });
    expect(songLyrics).toEqual({ ...song, lyrics: 'new text' });
    expect(songAuthor).toEqual({ ...song, author: { name: 'new author' } });
    expect(songStrummingPattern).toEqual({
        ...song,
        strummingPattern: { pattern: [1] },
    });
});
