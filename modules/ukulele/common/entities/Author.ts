/**
 * Song author, artist or band
 */
export interface Author {
    /**
     * Author id
     */
    _id?: string;

    /**
     * Author name
     */
    name: string;

    /**
     * Optional members of band or multiple artists
     */
    members?: Author[];
}
