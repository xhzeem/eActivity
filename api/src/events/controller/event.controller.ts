import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  Query,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { EventService } from '../service/event.service';
import { diskStorage } from 'multer';
import { join } from 'path';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../model/event-image.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventEntry } from '../model/event-entry.interface';

export const storage = {
  storage: diskStorage({
    destination: './uploads/event-images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/[a-zA-Z0-9_\s]/g, '') +
        uuidv4();
      const extention: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extention}`);
    },
  }),
};
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() eventEntry: EventEntry,
    @Request() req,
  ): Observable<EventEntry> {
    const user = req.user;
    return this.eventService.create(user, eventEntry);
  }

  // @Get()
  // findEventEntries(): Observable<EventEntry[]> {
  //   return this.eventService.findAll();
  // }
  @Get('')
  index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;

    return this.eventService.paginateAll({
      limit: Number(limit),
      page: Number(page),
      route: 'http://localhost:3000/api/event',
    });
  }
  @Get(':id')
  findOne(@Param('id') id: number): Observable<EventEntry> {
    return this.eventService.findOne(id);
  }
  //TODO ADD THIS DOWN, UserIsAuthorGuard
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() eventEntry: EventEntry,
  ): Observable<EventEntry> {
    return this.eventService.updateOne(Number(id), eventEntry);
  }
  //TODO ADD THIS DOWN, UserIsAuthorGuard
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.eventService.deleteOne(id);
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
      res.sendFile(join(process.cwd(), 'uploads/event-images/' + imagename)),
    );
  }
}
