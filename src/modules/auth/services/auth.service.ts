import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConstantsAuth } from '../constants/constants';
import { UserRepository } from 'src/database/repositories/user-repository';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/modules/email/email.service';
import { SignUpDTO } from '../dto/signUp.dto';
import { LoginDTO } from '../dto/login.dto';
import { ForgetPasswordDTO } from '../dto/forgetPassword.dto';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDTO } from '../dto/resetPassword.dto';
import { VerifyTokenDTO } from '../dto/verifyToken.dto';
import { ActivateUserDTO } from '../dto/activateUser.dto';

@Injectable()
export class AuthService {
    private readonly jwtSecret = this.configService.get<string>('JWT_SECRET', '');
    private readonly jwtExpires = this.configService.get<string>('JWT_TIME_EXPIRES', '');

    constructor(
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDTO: LoginDTO): Promise<string> {
        if (!loginDTO.username || !loginDTO.password) {
            throw new BadRequestException(ConstantsAuth.USER_OR_PASSWORD_INVALID);
        }

        const user: User = await this.userRepository.findUniqueByUsername(loginDTO.username);
        if (!user) {
            throw new UnauthorizedException(ConstantsAuth.USER_OR_PASSWORD_INVALID);
        }

        const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException(ConstantsAuth.USER_OR_PASSWORD_INVALID);
        }

        return await this.generateToken(user.email);
    }

    async signUp(signUpDTO: SignUpDTO): Promise<SignUpDTO> {
        signUpDTO.password = await this.encryptPassword(signUpDTO.password);
        const user = await this.userRepository.create(signUpDTO);
        delete signUpDTO.password;
        signUpDTO.id = user.id;

        // TODO -> Criar layout para e-mail, recuperá-lo de uma tabela
        // TODO -> Gerar método para criar URL de ativar usuário.
        const activateToken = await this.generateToken(signUpDTO.email);
        const activateUrl = `http://localhost:3000/auth/activateUser?userId=${signUpDTO.id}&token=${activateToken}`;
        await this.emailService.sendMail(
            signUpDTO.email,
            'Realizado criação de conta com sucesso',
            `<p>Ola ${signUpDTO.username}, sua conta foi criada com sucesso</p><br>
            <p><a href="${activateUrl}">Clique aqui para ativar sua conta</a></p>`,
        );

        return signUpDTO;
    }

    async activateUser(activateUserDTO: ActivateUserDTO): Promise<string> {
        try {
            console.log(activateUserDTO);
            return '';
        } catch (error: any) {
            throw new BadRequestException(ConstantsAuth.ERROR_TO_RESET_PASSWORD);
        }
    }

    async forgetPassword(forgetPasswordDTO: ForgetPasswordDTO): Promise<string> {
        let user: User;
        if (forgetPasswordDTO.email) {
            user = await this.userRepository.findUniqueByEmail(forgetPasswordDTO.email);
        } else {
            user = await this.userRepository.findUniqueByUsername(forgetPasswordDTO.username);
        }

        if (!user) {
            throw new NotFoundException(ConstantsAuth.USER_NOT_FOUND);
        }

        const recoverToken = await this.generateToken(user.email);
        await this.emailService.sendMail(
            user.email,
            'Recuperação de Senha',
            `Ola ${user.username}, token de recuperação de senha: ${recoverToken}!`,
        );
        return ConstantsAuth.FORGET_PASSWORD_MESSAGE;
    }

    async resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<string> {
        try {
            if (!resetPasswordDTO || !resetPasswordDTO.token || !resetPasswordDTO.password) {
                throw new BadRequestException(ConstantsAuth.ERROR_TO_RESET_PASSWORD);
            }
            const decodedToken = await this.verifyToken(resetPasswordDTO.token);

            const user = await this.userRepository.findUniqueByEmail(decodedToken.email);
            if (!user) {
                throw new NotFoundException(ConstantsAuth.USER_NOT_FOUND);
            }

            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
                throw new HttpException('Token expirado', HttpStatus.UNAUTHORIZED);
            }
            user.password = await this.encryptPassword(resetPasswordDTO.password);
            this.userRepository.update(user.id, user);
            return ConstantsAuth.RESET_PASSWORD_SUCCESSFUL;
        } catch (error: any) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException(ConstantsAuth.ERROR_TO_RESET_PASSWORD);
        }
    }

    private async generateToken(email: string): Promise<string> {
        return this.jwtService.sign(
            { email: email },
            {
                secret: this.jwtSecret,
                expiresIn: this.jwtExpires,
            },
        );
    }

    private async verifyToken(token: string): Promise<VerifyTokenDTO> {
        return this.jwtService.verify(token, {
            secret: this.jwtSecret,
        });
    }

    private async encryptPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }
}
