/**
 * Provides user and authentication specific components.
 *
 * @packageDocumentation
 */
export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { AuthenticationModal } from './components/AuthenticationModal';

export {
    useUserLocalMutation,
    useUserLocalQuery,
    USER_TOKEN_LOCAL_QUERY,
    USER_LOCAL_MUTATION,
    USER_LOCAL_MUTATION_VARIABLES,
    USER_TOKEN_LOCAL_QUERY_RETURN,
    USER_LOCAL_QUERY,
    USER_LOCAL_QUERY_RETURN,
} from './graphql/user';

import { writeUserMutation } from './graphql/user';
export const clientMutations = { writeUser: writeUserMutation };
