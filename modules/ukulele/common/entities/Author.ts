/**
 * Song author, artist, band
 */
export interface Author {
    /**
     * Author name
     */
    name: string;

    /**
     * Optional members of band or multiple artists
     */
    members?: Author[];
}
