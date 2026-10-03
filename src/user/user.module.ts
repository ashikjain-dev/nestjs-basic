import { Logger, Module,forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[forwardRef(()=>AuthModule)],
  controllers: [UserController],
  providers: [UserService,Logger],
  exports:[UserService]
})
export class UserModule {}
