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
  UnauthorizedException,
} from '@nestjs/common';
import * as config from '@nestjs/config';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyUserDto } from '../dtos/create-many-user.dto';
import { PaginationService } from '../../pagination/providers/pagination.service';
import { PaginateInterface } from '../../pagination/interfaces/paginate.interface';
import { HashService } from '../../auth/providers/hash.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { jwtConfig } from '../../auth/config/jwt.config';
import { AuthService } from '../../auth/providers/auth.service';

@Injectable()
export class UserService {
  private logName = 'UserService';
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => HashService))
    private readonly hashService: HashService,
    private readonly paginateService: PaginationService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly logger: Logger,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {}
  public findAll(
    id: number | undefined,
    page: number,
    limit: number,
  ): Promise<User | PaginateInterface<User>> {
    if (id !== undefined) {
      return this.findOneById(id);
    }

    return this.paginateService.paginateQuery(
      { page, limit },
      this.userRepository,
    );
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
        createUserdto.password = await this.hashService.hashPassword(
          createUserdto.password,
        );
        let newUser = this.userRepository.create(createUserdto);
        newUser = await this.userRepository.save(newUser);
        return this.generateToken(newUser);
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
  public async login(body: LoginUserDto) {
    try {
      const existingUserFound = await this.userRepository.findOne({
        where: { email: body.email },
      });
      if (!existingUserFound) {
        throw new NotFoundException(`your email is not found in our system`);
      }
      if (
        await this.hashService.comparePassword(
          body.password,
          existingUserFound.password,
        )
      ) {
        return this.generateToken(existingUserFound);
      } else {
        throw new UnauthorizedException('User email or password is incorrect');
      }
    } catch (error) {
      this.logger.log(
        `error while signing in to an user account:${body.email}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Not able to verify your account, please try again later`,
      );
    }
  }
  public async generateToken(user: User) {
    const token = await this.authService.generateToken(user);
    return {
      token,
      type: 'Bearer',
      expiresIn: this.jwtConfiguration.signOptions.expiresIn,
    };
  }
}
