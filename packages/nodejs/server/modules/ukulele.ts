import { ukuleleModule } from '@uls/ukulele-nodejs';

import { options } from './options';

const Ukulele = ukuleleModule.init(options);

export { Ukulele };
