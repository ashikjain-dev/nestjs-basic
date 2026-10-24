import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { TagService } from '../../tag/providers/tag.service';
import { UserService } from '../../user/providers/user.service';
import { Post } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ActiveUserInterface } from '../../auth/interfaces/active-user.interface';

@Injectable()
export class CreatePostService {
  private logger: Logger;
  constructor(
    private readonly userService: UserService,
    private readonly tagService: TagService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
    this.logger = new Logger('PostService');
  }

  public async CreatePost(body: CreatePostDto,activeUser:ActiveUserInterface) {
    try {
      const [user, tags] = await Promise.all([
        this.userService.findOneById(activeUser.id),
        this.tagService.findMultipleTagsById(body.tags || []),
      ]);
      if (!user) {
        throw new BadRequestException(
          `No user found with the id: ${activeUser.id}`,
        );
      }
      let newPost = this.postRepository.create({
        ...body,
        author: user,
        tags: tags,
      });
      newPost = await this.postRepository.save(newPost);
      return newPost;
    } catch (error) {
      this.logger.error(`error while creating a post:${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof QueryFailedError) {
      const dbError = error as any;

      // Unique constraint violation (e.g., duplicate slug or title)
      // Postgres error code: '23505' | MySQL error code: 1062
      if (dbError.code === '23505' || dbError.errno === 1062) {
        throw new ConflictException('A post with similar unique details already exists');
      }

      // Foreign key constraint failure or invalid column data
      // Postgres error code: '23503' | MySQL error code: 1452
      if (dbError.code === '23503' || dbError.errno === 1452) {
        throw new BadRequestException('Referenced entity (e.g., user or tag) is invalid or does not exist');
      }

      // Other database constraint failures
      throw new BadRequestException(`Database operation failed: ${dbError.detail || dbError.message}`);
    }
      throw new InternalServerErrorException(`Error while creating a post`);
    }
  }
}
