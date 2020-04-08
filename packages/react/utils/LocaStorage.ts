export class LocalStorage {
    getItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    setItem(key: string, value?: any) {
        value && sessionStorage.setItem(key, value);
    }

    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }
}
