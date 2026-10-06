import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/providers/user.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PostService {
  constructor(private readonly userService: UserService,
    @InjectRepository(Post)
    private readonly postRepository:Repository<Post>
  ) {}
  public findAll(userId: number): string {
    console.log(this.userService.findOneById(userId));
    return `A user all posts`;
  }
  public async createPost(body: any) {
    let newPost=this.postRepository.create(body)
    newPost=await this.postRepository.save(newPost)
    return newPost;
  
  }
}
