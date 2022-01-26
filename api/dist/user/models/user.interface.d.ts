import { BlogEntry } from 'src/blog/model/blog-entry.interface';
import { PostEntry } from 'src/userPost/model/post-entry.interface';
export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    bio?: string;
    password?: string;
    role?: UserRole;
    avatar?: string;
    blogEntries?: BlogEntry[];
    postEntries?: PostEntry[];
}
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    CLUB = "club",
    USER = "user"
}
