import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { DataStore } from "..";
import type { Comment, Like, Post, User } from "../../types";
import path from "path";

export class SqliteDataStore implements DataStore {
    public async openDB() {
        const db = await open({
            filename: path.join(__dirname, "coderSquare.sqlite"),
            driver: sqlite3.Database,
        });

        await db.migrate({
            migrationsPath: path.join(__dirname, "migrations"),
        });

        return this;
    }
    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    listPost(): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    createPost(post: Post): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
