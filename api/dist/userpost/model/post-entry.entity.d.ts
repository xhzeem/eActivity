import { UserEntity } from 'src/user/models/user.entity';
export declare class PostEntryEntity {
    id: number;
    postBody: string;
    creationDate: Date;
    updatedDate: Date;
    updateTimestamp(): void;
    postLikes: number;
    postImage: string;
    postPublishDate: Date;
    isPublished: boolean;
    author: UserEntity;
}
