import { userModule } from '@uls/user-nodejs';

import { options } from './options';

const User = userModule.init(options);

export { User };
