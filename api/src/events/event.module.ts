import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { EventController } from './controller/event.controller';
import { EventEntryEntity } from './model/event-entry.entity';
import { EventService } from './service/event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntryEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
