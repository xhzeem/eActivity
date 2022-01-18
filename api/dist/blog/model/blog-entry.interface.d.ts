import { User } from 'src/user/models/user.interface';
export interface BlogEntry {
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
