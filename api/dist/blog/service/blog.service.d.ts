import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { BlogEntryEntity } from '../model/blog-entry.entity';
import { BlogEntry } from '../model/blog-entry.interface';
export declare class BlogService {
    private readonly blogRepository;
    private userService;
    constructor(blogRepository: Repository<BlogEntryEntity>, userService: UserService);
    create(user: User, blogEntry: BlogEntry): Observable<BlogEntry>;
    generateSlug(title: string): Observable<string>;
    findAll(): Observable<BlogEntry[]>;
    findByUser(userId: number): Observable<BlogEntry[]>;
    findOne(slug: string): Observable<BlogEntry>;
    findOneById(id: number): Observable<BlogEntry>;
    updateOne(id: number, blogEntry: BlogEntry): Observable<BlogEntry>;
    deleteOne(id: number): Observable<any>;
    paginateAll(options: IPaginationOptions): Observable<Pagination<BlogEntry>>;
}
