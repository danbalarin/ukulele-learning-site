import sha1 from 'sha1';
import { HashFunction } from '@uls/core-common';

export const hashFn: HashFunction = (str: string) => sha1(str);
