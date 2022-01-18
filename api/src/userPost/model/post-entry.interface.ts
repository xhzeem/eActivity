import { User } from 'src/user/models/user.interface';

export interface PostEntry {
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
