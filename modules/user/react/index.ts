export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { AuthenticationModal } from './components/AuthenticationModal';
export { AuthenticatedRoute } from './components/AuthenticatedRoute';

export { useUserLocalMutation, useUserLocalQuery } from './graphql/user';

import { writeUserMutation } from './graphql/user';
export const clientMutations = { writeUser: writeUserMutation };
