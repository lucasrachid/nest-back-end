import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ForgetPasswordDTO {
    @IsEmail()
    @ApiProperty({ example: 'exemploEmail@exemplo.com.br', description: 'E-mail do cadastro' })
    email?: string;

    @IsString()
    @ApiProperty({ example: 'exemploUsuário', description: 'Nome de Usuário' })
    username?: string;
}
