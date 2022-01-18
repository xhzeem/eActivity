import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/service/user.service';
import { UserPostService } from '../service/user-post.service';
export declare class UserIsAuthorGuard implements CanActivate {
    private userService;
    private postService;
    constructor(userService: UserService, postService: UserPostService);
    canActivate(context: ExecutionContext): Observable<boolean>;
}
