import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "./user.services";
import { signToken } from "../auth/jwt";

const SALT_ROUNDS = 10;

export type RegisterInput = {
    email: string;
    password: string;
    name?: string;
    lastName?: string;
};

export const registerUser = async (input: RegisterInput) => {
    const existingUser = await findUserByEmail(input.email);
    if (existingUser) throw new Error("User already exists");

    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
    const newUser = await createUser({
        email: input.email,
        name: input.name,
        lastName: input.lastName,
        passwordHash,
        role: "USER",
    });
    return newUser;
}

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("User not found");
    if (!user.passwordHash) throw new Error("User has no password");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error("Invalid password");

    const token = await signToken({
        sub: user.id,
        email: user.email as string,
        role: user.role as string ?? undefined,
    })
    return {
        token,
        user:{
            //id: user.id,
            email: user.email as string,
            name: user.name as string,
            lastName: user.lastName as string,
            role: user.role as string,
        },
    }
}