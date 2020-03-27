import { Author } from '../entities/Author';
import { AuthorInteractor } from './AuthorInteractor';

let ai: AuthorInteractor;

const author: Author = {
    name: 'Slim Shady',
    members: [{ name: 'Eminem', members: [{ name: 'Marshall Mathers' }] }],
};

beforeEach(() => {
    ai = new AuthorInteractor(author);
});

it('should update values', () => {
    const name: Partial<Author> = {
        name: 'Smash mouth',
    };

    const members: Partial<Author> = {
        members: [{ name: 'Dank engine' }],
    };

    const authorName = ai.update(name);
    const authorMembers = ai.update(members);

    expect(authorName).toEqual({ ...author, name: 'Smash mouth' });
    expect(authorMembers).toEqual({
        ...author,
        members: [{ name: 'Dank engine' }],
    });
});
