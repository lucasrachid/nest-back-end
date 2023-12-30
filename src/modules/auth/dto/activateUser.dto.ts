import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ActivateUserDTO {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID User.' })
    userId?: number;

    @IsString()
    @ApiProperty({ example: 'exemploToken', description: 'Token de ativação de usuário.' })
    token: string;
}
