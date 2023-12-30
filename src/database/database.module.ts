import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user-repository';
import { PrismaService } from './prisma.service';

@Module({
    imports: [],
    providers: [UserRepository, PrismaService],
    exports: [UserRepository],
})
export class DatabaseModule {}
