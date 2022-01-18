import { BlogEntryEntity } from 'src/blog/model/blog-entry.entity';
import { EventEntryEntity } from 'src/events/model/event-entry.entity';
import { UserRole } from './user.interface';
export declare class UserEntity {
    id: number;
    name: string;
    bio: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    avatar: string;
    blogEntries: BlogEntryEntity[];
    eventEntries: EventEntryEntity[];
    emailToLowerCase(): void;
}
