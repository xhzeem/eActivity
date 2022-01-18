import { User } from "./user.interface";

export class BlogEntry {
    id?: number;
    articleTitle?: string;
    slug?: string;
    author?: User;
    articleDescription?: string;
    articleBody?: string;
    creationDate?: Date;
    updatedDate?: Date;
    articleLikes?: number;
    headerImage?: string;
    articlePublishDate?: Date;
    isPublished?: boolean;
}

export interface Meta {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
}

export interface Links {
        first: string;
        previous: string;
        next: string;
        last: string;
}

export interface BlogEntriesPageable {
    items: BlogEntry[];
    meta: Meta;
    links: Links;
}