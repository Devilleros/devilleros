import { prisma } from "../prisma";
import { User } from "@/types/user";

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
}

export const createUser = async (user: User) => {
    return prisma.user.create({ data: {
        email: user.email as string,
        name: user.name,
        lastName: user.lastName,
        image: user.image,
        passwordHash: user.passwordHash,
        provider: user.provider,
        providerId: user.providerId,
        role: user.role as string,
    } });
}