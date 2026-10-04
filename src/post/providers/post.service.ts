import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/providers/user.service';
@Injectable()
export class PostService {
  constructor(private readonly userService: UserService) {}
  public findAll(userId: number): string {
    console.log(this.userService.findOneById(userId));
    return `A user all posts`;
  }
}
