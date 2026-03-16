export type User = {
    id: string;
    email?: string;
    name?: string;
    lastName?: string;
    image?: string;
    passwordHash?: string;
    provider?: string;
    providerId?: string;
    role?: string;
}