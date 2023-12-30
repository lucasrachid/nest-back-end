import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { SignUpDTO } from 'src/modules/auth/dto/signUp.dto';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async findMany(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findUniqueById(id: number): Promise<User> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findUniqueByUsername(username: string): Promise<User> {
        return this.prisma.user.findUnique({ where: { username } });
    }

    async findUniqueByEmail(email: string): Promise<User> {
        return this.prisma.user.findUnique({ where: { email: email } });
    }

    async create(userDTO: SignUpDTO): Promise<User> {
        return this.prisma.user.create({ data: userDTO });
    }

    async update(id: number, user: User): Promise<User> {
        await this.prisma.user.update({ where: { id }, data: user });
        return this.prisma.user.findUnique({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }
}
