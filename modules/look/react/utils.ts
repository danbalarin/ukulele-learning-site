export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Sizes = 'sm' | 'md' | 'lg';
export type Spacing = string | number | (string | number)[];

export interface Margins {
    margin?: string | number;
    mr?: string | number;
    ml?: string | number;
    mt?: string | number;
    mb?: string | number;
}

export interface Paddings {
    padding?: string | number;
    pr?: string | number;
    pl?: string | number;
    pt?: string | number;
    pb?: string | number;
}

export interface BorderTheme {
    borderRadius?: string;
    borderTop?: string;
    borderBottom?: string;
    border?: string;
    borderWidth?: string;
}

export interface BackgroundTheme {
    background?: string;
}
