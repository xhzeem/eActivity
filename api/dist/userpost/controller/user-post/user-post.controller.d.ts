import { Observable } from 'rxjs';
import { PostEntry } from 'src/userPost/model/post-entry.interface';
import { UserPostService } from 'src/userpost/service/user-post/user-post.service';
export declare class UserPostController {
    private postService;
    constructor(postService: UserPostService);
    create(postEntry: PostEntry, req: any): Observable<PostEntry>;
}
