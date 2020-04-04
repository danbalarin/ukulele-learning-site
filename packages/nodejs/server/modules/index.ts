import { ServerModuleResponse } from '@uls/core-nodejs';

import { User } from './user';
import { Ukulele } from './ukulele';

export const modules: ServerModuleResponse[] = [User, Ukulele];
