import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Res,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { PostEntry } from 'src/userPost/model/post-entry.interface';
import { UserIsAuthorGuard } from '../guards/userIsAuthor.guard';
import { UserPostService } from '../service/user-post.service';
import { diskStorage } from 'multer';
import { join } from 'path';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../model/post-image.interface';


export const storage = {
  storage: diskStorage({
    destination: './uploads/post-images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/[a-zA-Z0-9_\s]/g, '') +
        uuidv4();
      const extention: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extention}`);
    },
  }),
};

@Controller('post')
export class UserPostController {
  constructor(private postService: UserPostService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() postEntry: PostEntry, @Request() req): Observable<PostEntry> {
    const user = req.user;
    return this.postService.create(user, postEntry);
  }
  @Get()
  findBlogEntries(): Observable<PostEntry[]> {
    return this.postService.findAll()
  }
  // @Get('')
  // index(
  //     @Query('page') page: number = 1,
  //     @Query('limit') limit: number = 10
  // ) {
  //     limit = limit > 100 ? 100 : limit;

  //     return this.postService.paginateAll({
  //         limit: Number(limit),
  //         page: Number(page),
  //         route: 'http://localhost:3000/api/post'
  //     })
  // }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<PostEntry> {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() postEntry: PostEntry,
  ): Observable<PostEntry> {
    return this.postService.updateOne(Number(id), postEntry);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.postService.deleteOne(id);
  }

  @Post('image/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req): Observable<Image> {
    return of(file);
  }

  @Get('image/:imagename')
  findImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(
      res.sendFile(join(process.cwd(), 'uploads/post-images/' + imagename)),
    );
  }
}
