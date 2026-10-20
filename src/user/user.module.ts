import { Logger, Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PaginationModule } from '../pagination/pagination.module';

@Module({
  imports: [forwardRef(() => AuthModule),PaginationModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, Logger],
  exports: [UserService],
})
export class UserModule {}
