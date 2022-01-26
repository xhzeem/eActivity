import { Observable } from 'rxjs';
import { PostEntry } from 'src/userPost/model/post-entry.interface';
import { UserPostService } from '../service/user-post.service';
import { Image } from '../model/post-image.interface';
export declare const storage: {
    storage: any;
};
export declare class UserPostController {
    private postService;
    constructor(postService: UserPostService);
    create(postEntry: PostEntry, req: any): Observable<PostEntry>;
    index(page?: number, limit?: number): Observable<import("nestjs-typeorm-paginate").Pagination<PostEntry, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: number): Observable<PostEntry>;
    updateOne(id: number, postEntry: PostEntry): Observable<PostEntry>;
    deleteOne(id: number): Observable<any>;
    uploadFile(file: any, req: any): Observable<Image>;
    findImage(imagename: any, res: any): Observable<Object>;
}
