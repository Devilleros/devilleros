import { prisma } from "../prisma";

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
}

export type CreateUserData = {
    email: string;
    name?: string | null;
    lastName?: string | null;
    image?: string | null;
    passwordHash?: string | null;
    provider?: string | null;
    providerId?: string | null;
    role: string;
};

export const createUser = async (data: CreateUserData) => {
    return prisma.user.create({ data });
}