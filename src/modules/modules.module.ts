import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
    imports: [AuthModule, RouterModule.register([{ path: 'auth', module: AuthModule }]), EmailModule],
})
export class ModulesModule {}
