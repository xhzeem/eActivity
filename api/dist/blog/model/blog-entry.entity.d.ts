import { UserEntity } from 'src/user/models/user.entity';
export declare class BlogEntryEntity {
    id: number;
    articleTitle: string;
    slug: string;
    articleDescription: string;
    articleBody: string;
    creationDate: Date;
    updatedDate: Date;
    updateTimestamp(): void;
    articleLikes: number;
    headerImage: string;
    articlePublishDate: Date;
    isPublished: boolean;
    author: UserEntity;
}
