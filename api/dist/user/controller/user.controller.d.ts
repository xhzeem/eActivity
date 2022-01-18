import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare const storage: {
    storage: any;
};
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: User): Observable<User | object>;
    login(user: User): Observable<Object>;
    findOne(params: any): Observable<User>;
    index(page?: number, limit?: number): Observable<Pagination<User>>;
    deleteOne(id: string): Observable<any>;
    updateOne(id: string, user: User): Observable<any>;
    updateRoleOfUser(id: string, user: User): Observable<User>;
    uploadFile(file: any, req: any): Observable<Object>;
    findAvatar(imagename: any, res: any): Observable<Object>;
}
