import { Logger, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './providers/post.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { TagModule } from '../tag/tag.module';
import { PaginationModule } from '../pagination/pagination.module';
import { CreatePostService } from './providers/create-post.service';

@Module({
  imports: [
    UserModule,
    TagModule,
    PaginationModule,
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostController],
  providers: [PostService, Logger, CreatePostService],
})
export class PostModule {}
