import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  private logName = 'UserService';
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}
  public findAll(id: number | undefined, page: number, limit: number): string {
    if (id === undefined) {
      return `all users information`;
    }
    return `${id}:information`;
  }
  public async findOneById(id: number) {
    return await this.userRepository.findOne({where:{id}})
  }

  public async createUser(createUserdto: CreateUserDto) {
    const existinUser = await this.userRepository.findOne({
      where: { email: createUserdto.email },
    });
    this.logger.log(
      `Existing user details: ${JSON.stringify(existinUser)}`,
      this.logName,
    );
    if (existinUser) {
      this.logger.log(
        `User found with the email :${createUserdto.email}`,
        this.logName,
      );
      throw new BadRequestException(`User already exist:${existinUser.email}`);
    } else {
      let newUser = this.userRepository.create(createUserdto);
      newUser = await this.userRepository.save(newUser);
      return newUser;
    }
  }
}
