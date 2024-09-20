import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async login(loginDto: LoginDto): Promise<{ user: User, access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if(!user) {
      throw new Error('Credenciales inválidas');
    }
    if(!bcrypt.compareSync(password, user.password)) {
      throw new Error('Credenciales inválidas');
    }

    const { id } = user;
    const payload = { id };
    const token = this.getJwtToken(payload);
    delete user.password;

    return { user, access_token: token };
  }

  private getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
