import {
  BadRequestException,
  ConflictException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyUserDto } from '../dtos/create-many-user.dto';

@Injectable()
export class UserService {
  private logName = 'UserService';
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly logger: Logger,
  ) {}
  public findAll(id: number | undefined, page: number, limit: number): string {
    if (id === undefined) {
      return `all users information`;
    }
    return `${id}:information`;
  }
  public async findOneById(id: number): Promise<User> {
    let userFound: User | null = null;
    try {
      userFound = await this.userRepository.findOne({
        where: { id },
        relations: { post: true },
      });
    } catch (error) {
      this.logger.error(`Not able to fetch the user detail:${error}`);
      throw new RequestTimeoutException(
        `Not able to fetch the user detail at the moment`,
      );
    }
    if (userFound) {
      return userFound;
    }
    throw new NotFoundException(`Not able to find the user with ID:${id}`);
  }

  public async createUser(createUserdto: CreateUserDto) {
    try {
      let existinUser = await this.userRepository.findOne({
        where: { email: createUserdto.email },
      });
      if (existinUser) {
        this.logger.log(
          `User found with the email :${createUserdto.email}`,
          this.logName,
        );
        throw new BadRequestException(
          `User already exist:${existinUser.email}`,
        );
      } else {
        let newUser = this.userRepository.create(createUserdto);
        newUser = await this.userRepository.save(newUser);
        return newUser;
      }
    } catch (error) {
      this.logger.error(`Error while creating a ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new RequestTimeoutException(
        `Unable to process your request at the moment`,
      );
    }
  }

  public async createMany(createUsersDto: CreateManyUserDto) {
    let queryRunner: undefined | QueryRunner = undefined;
    try {
      const users: User[] = [];
      queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      for (let user of createUsersDto.createManyusers) {
        let newUser = queryRunner.manager.create(User, user);
        let saveUser = await queryRunner.manager.save(newUser);
        users.push(saveUser);
      }
      await queryRunner.commitTransaction();
      return users;
    } catch (error: any) {
      await queryRunner?.rollbackTransaction();
      this.logger.error(`error while creating users:${error}`);
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner?.release();
    }
  }
}
