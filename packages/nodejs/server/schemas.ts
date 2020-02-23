import sha1 from 'sha1';
import { createSchema as createUserSchema } from '@uls/user-nodejs';

const hashFn = async (str: string) => sha1(str);
// const hashFn = async (str: string) => str;

export const UserSchema = createUserSchema(hashFn);
