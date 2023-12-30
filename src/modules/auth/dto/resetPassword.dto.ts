import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDTO {
    @IsString()
    @ApiProperty({ example: 'exemploSenha', description: 'Senha do usuário' })
    password: string;

    @IsString()
    @ApiProperty({ example: 'exemploToken', description: 'Token de redefinição de senha' })
    token: string;
}
