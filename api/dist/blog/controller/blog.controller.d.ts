import { Observable } from 'rxjs';
import { BlogEntry } from '../model/blog-entry.interface';
import { BlogService } from '../service/blog.service';
import { Image } from '../model/image.interface';
export declare const storage: {
    storage: any;
};
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    create(blogEntry: BlogEntry, req: any): Observable<BlogEntry>;
    index(page?: number, limit?: number): Observable<import("nestjs-typeorm-paginate").Pagination<BlogEntry, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(slug: string): Observable<BlogEntry>;
    updateOne(id: number, blogEntry: BlogEntry): Observable<BlogEntry>;
    deleteOne(id: number): Observable<any>;
    uploadFile(file: any, req: any): Observable<Image>;
    findImage(imagename: any, res: any): Observable<Object>;
}
