export interface Route {
    path: string;
    children: React.ReactNode;
    exact?: boolean;
}

export const routes: Route[] = [
    {
        path: '',
        children: 'Test',
    },
];
