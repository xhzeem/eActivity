import { UserEntity } from 'src/user/models/user.entity';
export declare class EventEntryEntity {
    id: number;
    eventTitle: string;
    eventBody: string;
    eventDescription: string;
    dueDate: string;
    eventEnrolles: string;
    creationDate: Date;
    updatedDate: Date;
    updateTimestamp(): void;
    eventLikes: number;
    eventPrice: number;
    eventSeats: number;
    eventImage: string;
    author: UserEntity;
}
