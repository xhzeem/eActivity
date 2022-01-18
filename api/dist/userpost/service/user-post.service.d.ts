import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { PostEntryEntity } from 'src/userPost/model/post-entry.entity';
import { PostEntry } from 'src/userPost/model/post-entry.interface';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UserPostService {
    private readonly postRepository;
    private userService;
    constructor(postRepository: Repository<PostEntryEntity>, userService: UserService);
    create(user: User, postEntry: PostEntry): Observable<PostEntry>;
    paginateAll(options: IPaginationOptions): Observable<Pagination<PostEntry>>;
    findAll(): Observable<PostEntry[]>;
    findOne(id: number): Observable<PostEntry>;
    updateOne(id: number, postEntry: PostEntry): Observable<PostEntry>;
    deleteOne(id: number): Observable<any>;
    addlike(): void;
}
