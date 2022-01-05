import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { UserPostController } from './controller/user-post.controller';
import { PostEntryEntity } from './model/post-entry.entity';
import { UserPostService } from './service/user-post.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntryEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [UserPostController],
  providers: [UserPostService],
})
export class PostModule {}
