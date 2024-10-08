import type { User, Post, Like, Comment } from "../../types";
import type { DataStore } from "../index";

export class InMemoryDataStore implements DataStore {

    private users: User[] = []
    private posts: Post[] = []
    private comments: Comment[] = []
    private likes: Like[] = []

    createUser(user: User): void {
        this.users.push(user)
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(u => u.email == email)
    }
    getUserByUsername(username: string): User | undefined {
        return this.users.find(u => u.username == username)
    }
    listPost(): Post[] {
        return this.posts
    }
    createPost(post: Post): void {
        this.posts.push(post)
    }
    getPost(id: string): Post | undefined {
        return this.posts.find(p => p.id == id)
    }
    deletePost(id: string): void {
        const idx = this.posts.findIndex(p => p.id == id)
        if (idx == -1)
            return

        this.posts.splice(idx, 1)


    }
    createLike(like: Like): void {
        this.likes.push(like)
    }
    createComment(comment: Comment): void {
        this.comments.push(comment)
    }
    listComments(postId: string): Comment[] {
        return this.comments.filter(comment => comment.postId === postId);
    }
    deleteComment(id: string): void {
        const idx = this.comments.findIndex(p => p.id == id)
        if (idx == -1)
            return

        this.comments.splice(idx, 1)
    }

}