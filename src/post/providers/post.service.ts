import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../../user/providers/user.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../../tag/providers/tag.service';
@Injectable()
export class PostService {
  private logger: Logger;
  constructor(
    private readonly userService: UserService,
    private readonly tagService: TagService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
    this.logger = new Logger('PostService');
  }
  public async findAll(userId: number | undefined) {
    if (userId) {
      const author = await this.userService.findOneById(userId);
      if (!author) {
        throw new NotFoundException(
          `Couldn't find the author with the id:${userId}`,
        );
      }
      return author;
    }
    return await this.postRepository.find({
      relations: {
        author: true,
        tags: true,
      },
    });
  }
  public async createPost(body: CreatePostDto) {
    const [user, tags] = await Promise.all([
      this.userService.findOneById(body.authorId),
      this.tagService.findMultipleTagsById(body.tags || []),
    ]);
    this.logger.log(tags);
    if (!user) {
      throw new BadRequestException(
        `No user found with the id: ${body.authorId}`,
      );
    }
    let newPost = this.postRepository.create({
      ...body,
      author: user,
      tags: tags,
    });
    newPost = await this.postRepository.save(newPost);
    return newPost;
  }

  public async deleteOne(id: number) {
    try {
      const response = await this.postRepository.delete({ id });
      this.logger.log(response);
      if (response.affected === 1) {
        return {
          statusCode: 204,
          message: `post is deleted successfully:${id}`,
        };
      } else {
        return {
          statusCode: 204,
          message: `couldn't find any post with id:${id}`,
        };
      }
    } catch (error) {
      this.logger.error(` ${error}`);
      throw new InternalServerErrorException(
        `Error while deleting a post : ${id}`,
      );
    }
  }
}
