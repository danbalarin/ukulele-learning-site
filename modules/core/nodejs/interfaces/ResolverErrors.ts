/**
 * Errors thrown by resolver
 */
export interface ResolverErrors {
    /**
     * Thrown when authentication fails
     */
    authErr: any;

    /**
     * Thrown when some input value is not valid
     */
    inputErr: any;
}
