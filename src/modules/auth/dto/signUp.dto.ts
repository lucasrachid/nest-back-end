import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';

export class SignUpDTO {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID do usuário.' })
    id?: number;

    @IsString()
    @ApiProperty({ example: 'exemploUsuario', description: 'Nome de usuário' })
    username: string;

    @IsString()
    @ApiProperty({ example: 'exemploSenha', description: 'Senha do usuário' })
    password: string;

    @IsEmail()
    @ApiProperty({ example: 'exemploEmail', description: 'Endereço de e-mail' })
    email: string;

    @IsString()
    @MaxLength(14)
    @ApiProperty({ example: '00000000000000', description: 'CPF ou CNPJ' })
    cpfCnpj: string;
}
