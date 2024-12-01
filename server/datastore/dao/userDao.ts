import type { User } from "../../types";

export interface userDao {
    createUser(user: User): Promise<void>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
}