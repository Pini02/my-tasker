import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { ConnectionModule } from '@app/connection';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ConnectionModule,
    JwtModule.register({
      secret: 'your-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthGuard, UsersService, AuthService],
  controllers: [AuthController],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
