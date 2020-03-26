import jwt from 'jsonwebtoken';
import { TokenCreator } from '@uls/core-common';

export const tokenCreator: TokenCreator = (obj: any) =>
    jwt.sign(obj, process?.env?.JWT_SECRET as string, {
        expiresIn: '1h',
    }) as string;
