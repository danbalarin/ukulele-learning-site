import sha1 from 'sha1';
import jwt from 'jsonwebtoken';

export const hashFn = (str: string) => sha1(str);
export const tokenCreator = (obj: any) =>
    jwt.sign(obj, process?.env?.JWT_SECRET as string, {
        expiresIn: '1h',
    }) as string;
