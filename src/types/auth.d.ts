export type User = {
    id: string;
    username: string;
};

export type AuthResponse = {
    success: boolean;
    token?: string;
    error?: string;
};