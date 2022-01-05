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
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UserIsAuthorGuard } from '../guards/userIsAuthor.guard';
import { BlogEntry } from '../model/blog-entry.interface';
import { BlogService } from '../service/blog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Image } from '../model/image.interface';
import { join } from 'path';

// STORAGE CONSTAINT TO CLEAR THE CODE

export const storage = {
  storage: diskStorage({
    destination: './uploads/blog-images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/[a-zA-Z0-9_\s]/g, '') +
        uuidv4();
      const extention: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extention}`);
    },
  }),
};

// controller
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
    const user = req.user;
    return this.blogService.create(user, blogEntry);
  }

  // @Get()
  // findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]> {
  //   if (userId == null) {
  //     return this.blogService.findAll();
  //   } else {
  //     return this.blogService.findByUser(userId);
  //   }
  // }

  @Get('')
  index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;

    return this.blogService.paginateAll({
      limit: Number(limit),
      page: Number(page),
      route: 'http://localhost:3000/api/blog',
    });
  }
  // @Get('user/:user')
  //   indexByUser(
  //       @Query('page') page: number = 1,
  //       @Query('limit') limit: number = 10,
  //       @Param('user') userId: number
  //   ) {
  //       limit = limit > 100 ? 100 : limit;

  //       return this.blogService.paginateByUser({
  //           limit: Number(limit),
  //           page: Number(page),
  //           route: http://localhost:3000/api/blog+ '/user/' + userId
  //       }, Number(userId))
  //   }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Observable<BlogEntry> {
    return this.blogService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() blogEntry: BlogEntry,
  ): Observable<BlogEntry> {
    return this.blogService.updateOne(Number(id), blogEntry);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.blogService.deleteOne(id);
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
      res.sendFile(join(process.cwd(), 'uploads/blog-images/' + imagename)),
    );
  }
}
