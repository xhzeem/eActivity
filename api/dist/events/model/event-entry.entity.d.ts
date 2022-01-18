import { UserEntity } from 'src/user/models/user.entity';
export declare class EventEntryEntity {
    id: number;
    eventTitle: string;
    eventBody: string;
    eventDescription: string;
    dueDate: string;
    creationDate: Date;
    updatedDate: Date;
    updateTimestamp(): void;
    eventLikes: number;
    eventImage: string;
    author: UserEntity;
}
