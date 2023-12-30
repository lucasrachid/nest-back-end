import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
    @IsString()
    @ApiProperty({ example: 'exemploUsuario', description: 'Nome de usuário' })
    username: string;

    @IsString()
    @ApiProperty({ example: 'exemploSenha', description: 'Senha do usuário' })
    password: string;
}
