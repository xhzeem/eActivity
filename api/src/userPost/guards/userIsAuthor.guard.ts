import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User, UserRole } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { PostEntry } from '../model/post-entry.interface';
import { UserPostService } from '../service/user-post.service';


@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private postService: UserPostService,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const blogEntryId: number = Number(params.id);
    const user: User = request.user;

    return this.userService.findOne(user.id).pipe(
      switchMap((user: User) =>
        this.postService.findOne(blogEntryId).pipe(
          map((postEntry: PostEntry) => {
            let hasPermission = false;

            if (user.id === postEntry.author.id) {
              hasPermission = true;
            } else if (UserRole.ADMIN == user.role) {
              hasPermission = true;
            }

            return user && hasPermission;
          }),
        ),
      ),
    );
  }
}
