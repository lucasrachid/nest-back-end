import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), PassportModule, JwtModule, DatabaseModule, EmailModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
