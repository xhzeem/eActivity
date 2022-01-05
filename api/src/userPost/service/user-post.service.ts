import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { PostEntryEntity } from 'src/userPost/model/post-entry.entity';
import { PostEntry } from 'src/userPost/model/post-entry.interface';
import { Repository } from 'typeorm';
import { switchMap, map, tap } from 'rxjs/operators';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserPostService {
    constructor(
        @InjectRepository(PostEntryEntity)
        private readonly postRepository: Repository<PostEntryEntity>,
        private userService: UserService,
      ) {}

    create(user: User, postEntry: PostEntry): Observable<PostEntry> {
        postEntry.author = user;
        return  from(this.postRepository.save(postEntry));
      }

    paginateAll(options: IPaginationOptions): Observable<Pagination<PostEntry>> {
        return from(
          paginate<PostEntry>(this.postRepository, options, {
            relations: ['author'],
            order: {id: "DESC"}
          }),
        ).pipe(map((postEntry: Pagination<PostEntry>) => postEntry));
      }
      
    findAll(): Observable<PostEntry[]> {
        return from(this.postRepository.find({ relations: ['author'],
        order: {id: "DESC"} }));
      }

    findOne(id: number): Observable<PostEntry> {
        return from(this.postRepository.findOne({ id }, { relations: ['author'] }));
      }

     updateOne(id: number, blogEntry: PostEntry): Observable<PostEntry> {
        return from(this.postRepository.update(id, blogEntry)).pipe(
          switchMap(() => this.findOne(id)),
        );
      }
    deleteOne(id: number): Observable<any> {
        return from(this.postRepository.delete(id));
      }

    // likePost(like: number , blogEntry: PostEntry): Observable<any> {
    //   return from(this.postRepository.update(like, blogEntry)).pipe(
    //     switchMap(() => )
    //   )
    // }
}
