import { User } from './user.interface';

export class EventEntry {
  id?: number;
  eventBody?: string;
  eventTitle?: string;
  eventDescription?: string;
  author?: User;
  creationDate?: Date;
  dueDate?: string;
  updatedDate?: Date;
  eventLikes?: number;
  eventImage?: string;
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

export interface EventEntriesPageable {
  items: EventEntry[];
  meta: Meta;
  links: Links;
}
