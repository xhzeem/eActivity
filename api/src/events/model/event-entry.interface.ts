import { User } from 'src/user/models/user.interface';

export interface EventEntry {
  id?: number;
  eventBody?: string;
  eventTitle?: string;
  eventDescription?: string;
  author?: User;
  creationDate?: Date;
  dueDate?: string;
  updatedDate?: Date;
  eventLikes?: number;
  eventPrice?: number;
  eventSeats?: number;
  eventImage?: string;
  eventEnrolles?: string;
}
