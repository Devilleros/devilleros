import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "./user.services";
import { signToken } from "../auth/jwt";
import { User } from "@/types/user";

const SALT_ROUNDS = 10;

export const registerUser = async (user: User) => {
    const existingUser = await findUserByEmail(user.email as string);
    if (existingUser) throw new Error("User already exists");

    const passwordHash = await bcrypt.hash(user.passwordHash as string, SALT_ROUNDS);
    const newUser = await createUser({ ...user, passwordHash });
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
        user,
    }
}