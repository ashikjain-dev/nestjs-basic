import { Logger, Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PaginationModule } from '../pagination/pagination.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../auth/config/jwt.config';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PaginationModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig)
  ],
  controllers: [UserController],
  providers: [UserService, Logger],
  exports: [UserService],
})
export class UserModule {}
