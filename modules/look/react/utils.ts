export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Sizes = 'sm' | 'md' | 'lg';
export type Spacing = string | number | (string | number)[];

export interface BorderTheme {
    borderRadius?: string;
    border?: string;
    borderWidth?: string;
}
