import { ServerModuleResponse } from '@uls/core-nodejs';

// User has to be first in order to set TypeComposer
import { User } from './user';
import { Ukulele } from './ukulele';

export const modules: ServerModuleResponse[] = [User, Ukulele];
