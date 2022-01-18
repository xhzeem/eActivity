import { User } from "./user.interface";

export class PostEntry {
    id?: number;
    postBody?: string;
    author?: User;
    creationDate?: Date;
    updatedDate?: Date;
    postLikes?: number;
    postImage?: string;
    postPublishDate?: Date;
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

export interface PostEntriesPageable {
    items: PostEntry[];
    meta: Meta;
    links: Links;
}