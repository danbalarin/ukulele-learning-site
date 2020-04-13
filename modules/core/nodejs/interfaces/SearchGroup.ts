export const SearchOption = `
    type SearchOption {
        label: String!
        value: String!
    }
`;

export const SearchGroup = `
    type SearchGroup {
        label: String!
        options: [SearchOption!]
    }
`;
