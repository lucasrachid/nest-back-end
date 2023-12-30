import { Controller, Post, Body, HttpCode, HttpStatus, Patch, Query, ParseIntPipe, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { SignUpDTO } from '../dto/signUp.dto';
import { LoginDTO } from '../dto/login.dto';
import { ForgetPasswordDTO } from '../dto/forgetPassword.dto';
import { ResetPasswordDTO } from '../dto/resetPassword.dto';
import { HttpStatusCode } from 'axios';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LoginDTO })
    async login(@Body() loginDTO: LoginDTO): Promise<string> {
        return this.authService.login(loginDTO);
    }

    @Post('signUp')
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: SignUpDTO })
    async signUp(@Body() signUpDTO: SignUpDTO): Promise<SignUpDTO> {
        return this.authService.signUp(signUpDTO);
    }

    @Get('activateUser')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatusCode.Ok, description: 'Usuário ativado com sucesso.' })
    async activateUser(@Query('userId', ParseIntPipe) userId: number, @Query('token') token: string): Promise<string> {
        return this.authService.activateUser({ userId, token });
    }

    @Post('forgetPassword')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: ForgetPasswordDTO })
    async forgetPassword(@Body() forgetPasswordDTO: ForgetPasswordDTO): Promise<string> {
        return this.authService.forgetPassword(forgetPasswordDTO);
    }

    @Patch('resetPassword')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: ResetPasswordDTO })
    async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO): Promise<string> {
        return this.authService.resetPassword(resetPasswordDTO);
    }
}
