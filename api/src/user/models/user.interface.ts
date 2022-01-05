import { BlogEntry } from 'src/blog/model/blog-entry.interface';

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
}
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}
